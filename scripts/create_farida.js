import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

const seedFarida = async () => {
  try {
    await connectDB();
    
    // Check if she already exists and remove
    await User.deleteOne({ email: "student1@lms.demo" });
    
    console.log("Creating user Farida...");
    const user = await User.create({
      userName: "farida",
      email: "student1@lms.demo",
      password: "Student123!",
      role: "student"
    });
    
    console.log("Fetching courses...");
    // Fetch 5 random courses
    const courses = await Course.aggregate([{ $sample: { size: 5 } }]);
    
    if (courses.length === 0) {
      console.log("No courses found in the database. Please run the main seed script first.");
      process.exit(1);
    }
    
    console.log(`Enrolling farida in ${courses.length} courses...`);
    const enrollments = courses.map(course => ({
      student: user._id,
      course: course._id,
      paymentStatus: "completed"
    }));
    
    await Enrollment.insertMany(enrollments);
    
    console.log("Success! Farida is created and enrolled.");
    console.log(`Email: ${user.email}`);
    console.log(`Password: Student123!`);
    console.log(`Enrolled in courses: \n${courses.map(c => `- ${c.title}`).join('\n')}`);
    
    process.exit(0);
  } catch (err) {
    console.error("Error creating user Farida:", err);
    process.exit(1);
  }
};

seedFarida();
