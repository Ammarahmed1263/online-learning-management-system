import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import Enrollment from "../models/Enrollment.js";
import Review from "../models/Review.js";
import { userRoles } from "../utils/userRoles.js";

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Curated Unsplash images mapped to topics for realistic course thumbnails
const topicImageMap = {
  "React":              "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800",
  "Node.js":            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
  "Python":             "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
  "Machine Learning":   "https://images.unsplash.com/photo-1655720035861-ba4fd21a598d?w=800",
  "Digital Marketing":  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  "Financial Analysis": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
  "Photoshop":          "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800",
  "Guitar":             "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800",
  "Leadership":         "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
  "Cyber Security":     "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
  "AWS":                "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
  "Docker":             "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800",
  "UI/UX":              "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
  "SEO":                "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800",
  "Data Analysis":      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  "Java":               "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
  "C++":                "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800",
  "Go":                 "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
  "Kubernetes":         "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
  "Excel":              "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
};
const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800";

const seed = async () => {
  await connectDB();

  try {
    // Start clean so repeated demos always produce the same data structure.
    await Promise.all([
      Review.deleteMany({}),
      Enrollment.deleteMany({}),
      Lesson.deleteMany({}),
      Course.deleteMany({}),
      Category.deleteMany({}),
      User.deleteMany({}),
    ]);

    // 1. Create Users
    const usersData = [
      {
        userName: "admin_demo",
        email: "admin@lms.demo",
        password: "Admin123!",
        role: userRoles.ADMIN,
      }
    ];

    // Create 5 Instructors
    for (let i = 1; i <= 5; i++) {
      usersData.push({
        userName: `instructor_${i}`,
        email: `instructor${i}@lms.demo`,
        password: "Instructor123!",
        role: userRoles.INSTRUCTOR,
      });
    }

    // Create 20 Students
    for (let i = 1; i <= 20; i++) {
      usersData.push({
        userName: `student_${i}`,
        email: `student${i}@lms.demo`,
        password: "Student123!",
        role: userRoles.STUDENT,
      });
    }

    const users = await User.create(usersData);
    const instructors = users.filter(u => u.role === userRoles.INSTRUCTOR);
    const students = users.filter(u => u.role === userRoles.STUDENT);

    // 2. Create Categories (10)
    const categoryNames = [
      "Web Development", "Data Science", "Mobile Development", "Design",
      "Business", "Marketing", "IT & Software", "Personal Development",
      "Photography & Video", "Music"
    ];

    const categoriesData = categoryNames.map(name => ({
      name,
      description: `All about ${name}. Explore the best courses to elevate your skills.`
    }));
    
    const categories = await Category.insertMany(categoriesData);

    // 3. Create Courses (60)
    const courseAdjectives = ["Complete", "Ultimate", "Practical", "Advanced", "Beginner's", "Masterclass", "Modern", "Essential", "Comprehensive", "Zero to Hero"];
    const courseTopics = ["React", "Node.js", "Python", "Machine Learning", "Digital Marketing", "Financial Analysis", "Photoshop", "Guitar", "Leadership", "Cyber Security", "AWS", "Docker", "UI/UX", "SEO", "Data Analysis", "Java", "C++", "Go", "Kubernetes", "Excel"];
    const courseSuffixes = ["Bootcamp", "Course", "Training", "for Beginners", "Mastery", "in 2026", "Step by Step", "Guide", "Crash Course", "Certification"];

    const coursesData = [];
    for (let i = 0; i < 60; i++) {
      const topic = getRandomElement(courseTopics);
      const title = `${getRandomElement(courseAdjectives)} ${topic} ${getRandomElement(courseSuffixes)} - ${i+1}`;
      coursesData.push({
        title,
        description: `This is a comprehensive course on ${title}. Learn from industry experts and enhance your career.`,
        price: getRandomInt(20, 200),
        category: getRandomElement(categories)._id,
        instructor: getRandomElement(instructors)._id,
        image: topicImageMap[topic] || defaultImage,
      });
    }

    const courses = await Course.insertMany(coursesData);

    // 4. Create Lessons
    // Even though users buy courses and cannot watch them, we populate some mock curriculum.
    const lessonsData = [];
    courses.forEach((course) => {
      const numLessons = getRandomInt(3, 5);
      for (let i = 1; i <= numLessons; i++) {
        lessonsData.push({
          title: `Lesson ${i}: Introduction to topic ${i}`,
          content: `This is the content for lesson ${i} in the course. It covers essential foundations.`,
          courseId: course._id,
          instructorId: course.instructor,
        });
      }
    });

    await Lesson.insertMany(lessonsData);

    // 5. Create Enrollments & Reviews
    const enrollmentsData = [];
    const reviewsData = [];

    // Each student enrolls in 3 to 8 random courses
    students.forEach((student) => {
      const numEnrollments = getRandomInt(3, 8);
      const enrolledCourses = new Set();
      
      while(enrolledCourses.size < numEnrollments) {
        enrolledCourses.add(getRandomElement(courses));
      }

      enrolledCourses.forEach((course) => {
        // Progress is 0 since this is an e-commerce platform and users cannot watch them.
        enrollmentsData.push({
          student: student._id,
          course: course._id,
          progress: 0, 
        });

        // 50% chance the student leaves a review
        if (Math.random() > 0.5) {
          const comments = ["Great course!", "Very informative.", "Helped me a lot.", "Could be better.", "Excellent instructor.", "Not what I expected, but okay.", "Highly recommended!"];
          reviewsData.push({
            student: student._id,
            course: course._id,
            rating: getRandomInt(3, 5), // Mostly positive reviews
            comment: getRandomElement(comments),
          });
        }
      });
    });

    await Enrollment.insertMany(enrollmentsData);
    if (reviewsData.length > 0) {
      await Review.insertMany(reviewsData);
    }

    console.log("Seed completed successfully.");
    console.log(`Created:`);
    console.log(`- ${users.length} Users (${instructors.length} instructors, ${students.length} students)`);
    console.log(`- ${categories.length} Categories`);
    console.log(`- ${courses.length} Courses`);
    console.log(`- ${lessonsData.length} Lessons`);
    console.log(`- ${enrollmentsData.length} Enrollments`);
    console.log(`- ${reviewsData.length} Reviews`);
    
    console.log("\nDemo users:");
    console.log("- admin@lms.demo / Admin123!");
    console.log("- instructor1@lms.demo / Instructor123!");
    console.log("- student1@lms.demo / Student123!");

  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
