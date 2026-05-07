import OpenAI from "openai";
import asyncWrapper from "../utils/asyncWrapper.js";
import jsend from "../utils/jsend.js";
import AppError from "../utils/appError.js";
import Course from "../models/Course.js";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const chat = asyncWrapper(async (req, res, next) => {
  const { message, history = [] } = req.body;

  if (!message) {
    return next(new AppError("Please provide a message", 400));
  }

  const courses = await Course.find().populate("category", "name");
  const coursesContext = courses
    .map((c) => `- ${c.title} (Category: ${c.category?.name}, Price: ${c.price}, ID: ${c._id})`)
    .join("\n");

  console.log("Chatbot Course Context:\n", coursesContext);

  const messages = [
    {
      role: "system",
      content: `You are the **EduMart Mentor**, a friendly and professional AI mentor.

### AVAILABLE COURSES ON EDUMART:
${coursesContext}

### YOUR CORE IDENTITY:
- **Tone**: Professional, friendly, and **CONCISE**.
- **Goal**: Help students by recommending ONLY real courses from the "AVAILABLE COURSES" list below.

### PLATFORM INFORMATION:
- **Payments**: We exclusively use **Stripe** for 100% secure payments. We accept all major Credit and Debit cards (Visa, Mastercard, etc.). We DO NOT currently accept PayPal, Bank Transfers, or Cash.
- **Access**: All courses come with Full Lifetime Access upon enrollment.
- **Certificates**: A professional verified certificate is provided upon completion.

### OPERATIONAL GUIDELINES:
1. **Adaptive Communication (STRICT)**: 
   - **IF SPEAKING EGYPTIAN ARABIC (Ammiya)**: Be natural, brief, and use clean Egyptian dialect.
   - **IF SPEAKING ENGLISH**: Be professional and direct.
2. **STRICT INVENTORY ONLY (CRITICAL)**: You are PROHIBITED from recommending any courses from external platforms (Udemy, Coursera, etc.). You ONLY know about the courses listed in the "AVAILABLE COURSES ON EDUMART" section below. If a user asks for a course or topic we don't have, politely state that we don't have it and suggest the closest alternative from our list.
3. **Platform Facts**: Never invent features or payment methods. Always refer to the "PLATFORM INFORMATION" section.
4. **Links/Enrollment**: When recommending a course, YOU MUST provide the link in this exact format: [Course Title](http://localhost:4200/courses/${"${courseID}"}).
5. **No Hallucinations**: Do not invent prices, durations, or descriptions. Use the data provided.

### RESPONSE STRUCTURE:
- Brief greeting.
- Direct answer or recommendation.
- Exact link using the ID.`,
    },

    ...history,
    { role: "user", content: message },
  ];

  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
    });

    const responseMessage = completion.choices[0].message.content;

    res.status(200).json(
      jsend.success({
        reply: responseMessage,
        history: [
          ...messages.filter((m) => m.role !== "system"),
          { role: "assistant", content: responseMessage },
        ],
      }),
    );
  } catch (error) {
    return next(new AppError(`Chatbot error: ${error.message}`, 500));
  }
});
