import Course from "../models/Course.js";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import stripe from "../config/stripe.js";
import jsend from "../utils/jsend.js";

const createCheckoutSession = asyncWrapper(async (req, res) => {
  const { courseIds } = req.body;
  const user = req.user;

  const courses = await Course.find({ _id: { $in: courseIds } }, "title price");

  if (!courses || courses.length === 0) {
    return res
      .status(400)
      .json(jsend.error("No valid courses found for checkout."));
  }

  let dbUser = await User.findById(user.id, "email stripeCustomerId");

  if (!dbUser.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: dbUser.email,
      metadata: { userId: user.id },
    });
    dbUser.stripeCustomerId = customer.id;
    await dbUser.save();
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: courses.map((course) => ({
      price_data: {
        currency: "egp",
        product_data: {
          name: course.title,
          images: [course.image],
        },
        unit_amount: Math.round(course.price * 100),
      },
      quantity: 1,
    })),
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    customer: dbUser.stripeCustomerId,
    saved_payment_method_options: {
      payment_method_save: "enabled",
    },
    metadata: {
      userId: user.id,
      courseIds: JSON.stringify(courseIds),
    },
    allow_promotion_codes: true,
  });

  return res.status(200).json(
    jsend.success({
      sessionUrl: session.url,
    }),
  );
});

const getCheckoutSession = asyncWrapper(async (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json(jsend.error("Session ID is required."));
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  return res.status(200).json(
    jsend.success({
      orderId: session.payment_intent,
      customerName: session.customer_details.name,
      totalAmount: session.amount_total / 100,
      currency: session.currency,
      items: session.line_items.data.map((item) => item.description),
    }),
  );
});

const handleStripeWebhook = asyncWrapper(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { userId, courseIds } = session.metadata;
    const parsedCourseIds = JSON.parse(courseIds);

    const enrollmentPromises = parsedCourseIds.map((courseId) =>
      Enrollment.findOneAndUpdate(
        { student: userId, course: courseId },
        { $setOnInsert: { student: userId, course: courseId } },
        { upsert: true, returnDocument: "after" },
      ),
    );

    await Promise.all(enrollmentPromises);
    console.log(
      `Successfully enrolled User ${userId} in ${parsedCourseIds.length} courses.`,
    );
  }

  res.status(200).json({ received: true });
});

export { createCheckoutSession, getCheckoutSession, handleStripeWebhook };
