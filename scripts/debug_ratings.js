import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Course from "../models/Course.js";
import Review from "../models/Review.js";

const debug = async () => {
  await connectDB();
  const course = await Course.findOne();
  if (!course) {
    console.log("No course found");
    process.exit(1);
  }

  const reviews = await Review.find({ course: course._id });
  console.log(`Course: ${course.title}`);
  console.log(`Average Rating in DB: ${course.averageRating}`);
  console.log(`Num Reviews in DB: ${course.numReviews}`);
  console.log("Actual Reviews:");
  reviews.forEach(r => console.log(` - Rating: ${r.rating}`));

  const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const manualAvg = reviews.length > 0 ? sum / reviews.length : 0;
  console.log(`Manual Calculation: ${manualAvg.toFixed(1)}`);

  process.exit(0);
};

debug();
