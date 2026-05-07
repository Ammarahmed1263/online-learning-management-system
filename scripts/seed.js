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

const categoriesData = [
  { name: "Development", description: "Web, Mobile, Game, and Software Development." },
  { name: "Business", description: "Entrepreneurship, Management, and Strategy." },
  { name: "Design", description: "UI/UX, Graphic Design, and 3D Modeling." },
  { name: "Marketing", description: "Digital Marketing, SEO, and Social Media." },
  { name: "Data Science", description: "AI, Machine Learning, and Big Data." },
  { name: "Photography", description: "Digital Photography and Video Production." },
  { name: "Music", description: "Instruments, Theory, and Audio Production." },
  { name: "Finance", description: "Investing, Crypto, and Accounting." },
  { name: "Health & Fitness", description: "Yoga, Nutrition, and Mental Health." },
  { name: "Personal Development", description: "Productivity, Leadership, and Soft Skills." }
];

const coursesData = {
  "Development": [
    { title: "Complete Web Dev Bootcamp 2025", instructor: "Angela Yu", price: 129.99, img: "1498050108023-c5249f4df085" },
    { title: "Angular: The Complete Guide", instructor: "Maximilian Schwarzmüller", price: 119.99, img: "1593720213428-28a5b9e94613" },
    { title: "React & Next.js Masterclass", instructor: "Maximilian Schwarzmüller", price: 139.99, img: "1633356122544-f134324a6cee" },
    { title: "100 Days of Python Pro", instructor: "Angela Yu", price: 99.99, img: "1526374965328-7f61d4dc18c5" },
    { title: "Node.js Developer Course", instructor: "Andrew Mead", price: 89.99, img: "1502945015378-0e284ca1a5be" },
    { title: "iOS & Swift App Development", instructor: "Angela Yu", price: 149.99, img: "1512941937669-90a1b58e7e9c" },
    { title: "Flutter & Dart Masterclass", instructor: "Maximilian Schwarzmüller", price: 109.99, img: "1512941937669-90a1b58e7e9c" },
    { title: "The Java Masterclass 2025", instructor: "Tim Buchalka", price: 124.99, img: "1517694712202-14dd9538aa97" },
    { title: "Modern C++ for Professionals", instructor: "John Smith", price: 79.99, img: "1555066931-4365d14bab8c" },
    { title: "Ultimate Unreal Engine 5 Game Dev", instructor: "Stephen Ulibarri", price: 159.99, img: "1550745165-9bc0b252726f" }
  ],
  "Business": [
    { title: "An Entire MBA in 1 Course", instructor: "Chris Haroun", price: 139.99, img: "1507679799987-c73779587ccf" },
    { title: "The Strategy Masterclass", instructor: "Dr. J", price: 119.99, img: "1460925895917-afdab827c52f" },
    { title: "Entrepreneurship: From Zero to Exit", instructor: "Phil Ebiner", price: 99.99, img: "1556761175-b413da4baf72" },
    { title: "PMP Exam Prep Seminar", instructor: "Joseph Phillips", price: 124.99, img: "1531482615713-2afd69097998" },
    { title: "Product Management First Steps", instructor: "LinkedIn Learning", price: 79.99, img: "1519389950473-47ba0277781c" },
    { title: "Leadership Skills for New Managers", instructor: "Chris Croft", price: 64.99, img: "1522202176988-66273c2fd55f" },
    { title: "Supply Chain Management Pro", instructor: "MIT xPro", price: 149.99, img: "1586528116311-ad8dd3c8310d" },
    { title: "Sales Training Masterclass", instructor: "Chris Croft", price: 54.99, img: "1552581234-26160f608093" },
    { title: "Customer Service Mastery", instructor: "Tom Abbot", price: 44.99, img: "1516321497487-e288fb19713f" },
    { title: "Business Writing Strategies", instructor: "Harvard Online", price: 109.99, img: "1455390582262-044cdead277a" }
  ],
  "Design": [
    { title: "Graphic Design Masterclass", instructor: "Lindsay Marsh", price: 89.99, img: "1561070791-2526d30994b5" },
    { title: "UI/UX Design Essentials", instructor: "Daniel Walter Scott", price: 99.99, img: "1559028012-481c04fa702d" },
    { title: "Figma to Webflow Masterclass", instructor: "Vako Shvili", price: 109.99, img: "1581291518633-83b4ebd1d83e" },
    { title: "Adobe Illustrator CC Masterclass", instructor: "Martin Perhiniak", price: 79.99, img: "1572044162444-ad60f128bdea" },
    { title: "After Effects for Motion Graphics", instructor: "Phil Ebiner", price: 114.99, img: "1550745165-9bc0b252726f" },
    { title: "Photoshop Training: Zero to Pro", instructor: "Cristian Doru", price: 84.99, img: "1579935110464-fcd041be62d0" },
    { title: "Design Thinking Fundamentals", instructor: "IDEO U", price: 149.99, img: "1558655146-d09347e92766" },
    { title: "Blender 3D Modeling Mastery", instructor: "Grant Abbitt", price: 69.99, img: "1617791160505-6f00504e3519" },
    { title: "Canva Design for Entrepreneurs", instructor: "Jeremy Deighan", price: 49.99, img: "1611162617474-5b21e879e113" },
    { title: "Logo Design Masterclass", instructor: "Satori Graphics", price: 94.99, img: "1626785774573-4b799315345d" }
  ],
  "Marketing": [
    { title: "Digital Marketing Strategy 2025", instructor: "Robin & Jesper", price: 129.99, img: "1533750349088-cd871a92f312" },
    { title: "Facebook & Instagram Ads Mastery", instructor: "Justin OBrien", price: 104.99, img: "1611162617213-7d7a39e9b1d7" },
    { title: "SEO Training: Get to Page 1", instructor: "Arun Nagarathanam", price: 84.99, img: "1571721795195-a2ca2d3370a9" },
    { title: "Copywriting - Professional Guide", instructor: "Tamsin Henderson", price: 69.99, img: "1455390582262-044cdead277a" },
    { title: "YouTube Marketing Growth Guide", instructor: "Phil Ebiner", price: 94.99, img: "1611162617263-4ec3060a058e" },
    { title: "LinkedIn B2B Lead Generation", instructor: "Josh Turner", price: 119.99, img: "1611944212129-29977ae1398c" },
    { title: "Email Marketing Masterclass", instructor: "HubSpot Academy", price: 74.99, img: "1563986768609-322da13575f3" },
    { title: "Google Ads (AdWords) Advanced", instructor: "Isaac Rudansky", price: 134.99, img: "1542744173-8e7e53415bb0" },
    { title: "Branding Masterclass Process", instructor: "Philip VanDusen", price: 99.99, img: "1523413651479-597eb2da0ad6" },
    { title: "Content Marketing Masterclass", instructor: "Neil Patel", price: 109.99, img: "1432888498266-38ffec3eaf0a" }
  ],
  "Data Science": [
    { title: "Machine Learning A-Z: Python", instructor: "Kirill Eremenko", price: 129.99, img: "1555949963-ff9fe0c870eb" },
    { title: "Python for Data Science Bootcamp", instructor: "Jose Portilla", price: 114.99, img: "1551288049-bebda4e38f71" },
    { title: "Deep Learning Specialization", instructor: "Andrew Ng", price: 149.99, img: "1485827404703-89b55fcc595e" },
    { title: "Tableau 2025 A-Z Training", instructor: "Kirill Eremenko", price: 84.99, img: "1551288049-bebda4e38f71" },
    { title: "IBM Data Science Methodology", instructor: "IBM Academy", price: 109.99, img: "1527474305487-b87b222841cc" },
    { title: "Applied Data Science with Python", instructor: "Univ Michigan", price: 139.99, img: "1460925895917-afdab827c52f" },
    { title: "NLP with Deep Learning", instructor: "Stanford Online", price: 159.99, img: "1555949963-ff9fe0c870eb" },
    { title: "Google Cloud Data Engineering", instructor: "Google Cloud", price: 124.99, img: "1544197150-b99a580bb7a8" },
    { title: "Statistics for Business Analytics", instructor: "Kirill Eremenko", price: 74.99, img: "1460925895917-afdab827c52f" },
    { title: "Big Data: Hadoop and Spark", instructor: "UC San Diego", price: 144.99, img: "1640158615573-cd28feb1bf4e" }
  ],
  "Photography": [
    { title: "Photography Masterclass Guide", instructor: "Phil Ebiner", price: 114.99, img: "1452784444945-3f422708fe5e" },
    { title: "Adobe Premiere Pro CC Video", instructor: "Phil Ebiner", price: 124.99, img: "1550745165-9bc0b252726f" },
    { title: "iPhone Photography Mastery", instructor: "Dale McManus", price: 59.99, img: "1516035069371-29a1b244cc32" },
    { title: "Portrait Photography Secrets", instructor: "Annie Leibovitz", price: 149.99, img: "1542038784456-1ea8e935640e" },
    { title: "Night Photography Masterclass", instructor: "Jim Hamel", price: 74.99, img: "1502134249126-9f3755a50d78" },
    { title: "Street Photography Art", instructor: "Eric Kim", price: 69.99, img: "1474552226712-ac0f0961a954" },
    { title: "Professional Food Photography", instructor: "Skyler Burt", price: 84.99, img: "1476224203421-9ac39bcb3327" },
    { title: "Wedding Photography Business", instructor: "John Smith", price: 139.99, img: "1511285560929-80b456fea0bc" },
    { title: "Lightroom Classic Masterclass", instructor: "Phil Ebiner", price: 99.99, img: "1542038784456-1ea8e935640e" },
    { title: "Cinematography Art Guide", instructor: "Roger Deakins", price: 159.99, img: "1485846234645-a62644f84728" }
  ],
  "Music": [
    { title: "Pianoforall: Learn Piano Fast", instructor: "Robin Hall", price: 104.99, img: "1552422535-c45813c61732" },
    { title: "Professional Guitar Masterclass", instructor: "Michael Palmisano", price: 119.99, img: "579797990179-4ca11c8b47fd" },
    { title: "Music Theory Comprehensive", instructor: "Jason Allen", price: 69.99, img: "1507838153414-b4b713384a76" },
    { title: "Ableton Live 11 Masterclass", instructor: "Jason Allen", price: 129.99, img: "1598488035139-bdbb2231ce04" },
    { title: "Singing Success Masterclass", instructor: "Brett Manning", price: 149.99, img: "1597169428801-7c1adf2623bd" },
    { title: "Drum Set Mastery Guide", instructor: "John Smith", price: 89.99, img: "1519892300165-cb5542fb47c7" },
    { title: "Violin Mastery: Perlman Method", instructor: "Itzhak Perlman", price: 159.99, img: "1460039230329-eb070fc6c77c" },
    { title: "Songwriting: Lyrics & Melody", instructor: "Berklee College", price: 134.99, img: "1511379938547-c1f69419868d" },
    { title: "Sound Design for Games", instructor: "Hans Zimmer", price: 169.99, img: "1598488035139-bdbb2231ce04" },
    { title: "DJing Masterclass: Bedroom to Club", instructor: "James Hype", price: 114.99, img: "1530014671970-707f86eb10f5" }
  ],
  "Finance": [
    { title: "Stock Trading Masterclass", instructor: "Mohsen Hassan", price: 139.99, img: "1691643158804-d3f02eb456a3" },
    { title: "Crypto Investment Course 2025", instructor: "Suppoman", price: 124.99, img: "1518546305927-5a555bb7020d" },
    { title: "Financial Statement Analysis", instructor: "365 Careers", price: 99.99, img: "1763730512449-f1a505f432a9" },
    { title: "Personal Finance Mastery", instructor: "Ramit Sethi", price: 89.99, img: "1579621970563-ebec7560ff3e" },
    { title: "Forex Trading: A Complete Guide", instructor: "Adam Khoo", price: 149.99, img: "1664476845274-27c2dabdd7f0" },
    { title: "Financial Modeling in Excel", instructor: "Wall Street Prep", price: 169.99, img: "1551288049-bebda4e38f71" },
    { title: "Real Estate Investing Secrets", instructor: "Grant Cardone", price: 129.99, img: "1560518883-ce09059eeffa" },
    { title: "Venture Capital Masterclass", instructor: "Wharton School", price: 159.99, img: "1460925895917-afdab827c52f" },
    { title: "Corporate Finance Mastery", instructor: "CFI Academy", price: 114.99, img: "1655813710718-00043b177128" },
    { title: "Tax Preparation Guide 2025", instructor: "H&R Block", price: 79.99, img: "1554224155-6726b3ff858f" }
  ],
  "Health & Fitness": [
    { title: "Yoga for Beginners: 30 Days", instructor: "Adriene Mishler", price: 84.99, img: "1544367567-0f2fcb009e0b" },
    { title: "Nutrition Masterclass Guide", instructor: "Felix Harder", price: 74.99, img: "1490645935967-10de6ba17061" },
    { title: "Bodyweight Fitness Masterclass", instructor: "Antranik", price: 69.99, img: "1517836357463-d25dfeac3438" },
    { title: "The Science of Better Sleep", instructor: "Matthew Walker", price: 94.99, img: "1495197359483-d092478c170a" },
    { title: "Mental Health Awareness Guide", instructor: "Red Cross", price: 59.99, img: "1661778586542-68e9c6196a6b" },
    { title: "Running Mastery: 5K to Pro", instructor: "Hal Higdon", price: 79.99, img: "1476480862126-209bfaa8edc8" },
    { title: "The Science of Modern Cooking", instructor: "Gordon Ramsay", price: 149.99, img: "1556910103-1c02745aae4d" },
    { title: "Home Workout Revolution", instructor: "Jeff Cavaliere", price: 89.99, img: "1517836357463-d25dfeac3438" },
    { title: "Biohacking Optimization", instructor: "Dave Asprey", price: 119.99, img: "1507413245164-6160d8298b31" },
    { title: "Healthy Meal Prep Secrets", instructor: "Kevin Curry", price: 54.99, img: "1490645935967-10de6ba17061" }
  ],
  "Personal Development": [
    { title: "Life Coaching Certificate", instructor: "Kain Ramsay", price: 119.99, img: "1523240795612-9a054b0db644" },
    { title: "Neuroscience for Success", instructor: "Gregory Caremans", price: 84.99, img: "1507413245164-6160d8298b31" },
    { title: "Speed Reading Machine", instructor: "Silviu Marisk", price: 49.99, img: "1512820790803-83ca734da794" },
    { title: "Master Your Emotions Guide", instructor: "Thibaut Meurisse", price: 54.99, img: "1544018239-bcbbc2c55c58" },
    { title: "Time Management Mastery", instructor: "Brian Tracy", price: 64.99, img: "1567564675259-6c6268b64236" },
    { title: "Public Speaking Masterclass", instructor: "Dale Carnegie", price: 109.99, img: "1475721027785-f74eccf877e2" },
    { title: "Emotional Intelligence EQ", instructor: "Travis Bradberry", price: 79.99, img: "1739123854182-339bb87b89fa" },
    { title: "Meditation & Mindfulness", instructor: "Andy Puddicombe", price: 44.99, img: "1506126613408-eca07ce68773" },
    { title: "Negotiation Skills Mastery", instructor: "Chris Voss", price: 129.99, img: "1552581234-26160f608093" },
    { title: "Self-Discipline Masterclass", instructor: "Martin Meadows", price: 59.99, img: "1506126613408-eca07ce68773" }
  ]
};

const seed = async () => {
  try {
    await connectDB();
    console.log("Database connected for seeding...");

    // 1. Clear existing data
    console.log("Cleaning database...");
    await Promise.all([
      Review.deleteMany({}),
      Enrollment.deleteMany({}),
      Lesson.deleteMany({}),
      Course.deleteMany({}),
      Category.deleteMany({}),
      User.deleteMany({}),
    ]);

    // 2. Create Core Users
    console.log("Creating core users...");
    await User.create({
      userName: "Admin User",
      email: "admin@edumart.com",
      password: "Admin123!",
      role: "admin",
    });

    await User.create({
      userName: "Student Demo",
      email: "student@lms.demo",
      password: "Student123!",
      role: "student",
    });

    // Create a pool of 20 students with REAL names for reviews
    console.log("Creating student pool with real names...");
    const studentNames = [
      "Ahmed Ali", "Sarah Mansour", "Omar Hassan", "Laila Mahmoud",
      "John Smith", "Emma Watson", "Youssef Ibrahim", "Nour El-Din",
      "Mona Zaki", "Khaled El-Sawy", "Hala Shiha", "Tarek Lotfy",
      "Karim Abdel Aziz", "Hend Sabry", "Amr Diab", "Sherine Abdel Wahab",
      "Mohamed Ramadan", "Donia Samir Ghanem", "Ahmed Helmy", "Yasmin Abdel Aziz"
    ];

    const studentPool = [];
    for (let i = 0; i < studentNames.length; i++) {
      const s = await User.create({
        userName: studentNames[i],
        email: `student_${studentNames[i].toLowerCase().replace(/ /g, "_")}@edumart.demo`,
        password: "Student123!",
        role: "student"
      });
      studentPool.push(s);
    }

    const reviewComments = [
      "Amazing course! Highly recommended.",
      "Great content and very clear explanations.",
      "I learned so much, thanks to the instructor.",
      "The projects were very helpful and practical.",
      "A bit challenging but definitely worth it!",
      "Excellent course structure and delivery.",
      "One of the best courses I've taken on this topic."
    ];

    // 3. Create Categories and Courses
    console.log("Creating 10 categories and 100 courses...");
    for (const catData of categoriesData) {
      const category = await Category.create(catData);
      const coursesForCat = coursesData[category.name];

      if (coursesForCat) {
        for (const courseInfo of coursesForCat) {
          // Create an instructor for this course
          const instructorName = courseInfo.instructor;
          const instrEmail = `${instructorName.toLowerCase().replace(/ /g, ".")}@edumart.demo`;
          
          let instructor = await User.findOne({ email: instrEmail });
          if (!instructor) {
            instructor = await User.create({
              userName: instructorName,
              email: instrEmail,
              password: "Instructor123!",
              role: "instructor"
            });
          }

          const course = await Course.create({
            title: courseInfo.title,
            description: `A comprehensive course on ${category.name} focusing on practical skills and industry standards.`,
            price: courseInfo.price,
            category: category._id,
            instructor: instructor._id,
            image: `https://images.unsplash.com/photo-${courseInfo.img}?auto=format&fit=crop&w=800&q=80`
          });

          // Add lessons
          for (let l = 1; l <= 5; l++) {
            await Lesson.create({
              title: `Lesson ${l}: ${courseInfo.title} Foundations`,
              content: `This lesson covers the core principles of ${courseInfo.title}.`,
              courseId: course._id,
              instructorId: instructor._id
            });
          }

          // Add random reviews from the pool (ensure unique students per course)
          const numReviews = Math.floor(Math.random() * 3) + 3; // 3 to 5 reviews
          const shuffledPool = [...studentPool].sort(() => 0.5 - Math.random());
          const selectedStudents = shuffledPool.slice(0, numReviews);

          for (const student of selectedStudents) {
            await Review.create({
              student: student._id,
              course: course._id,
              rating: Math.floor(Math.random() * 3) + 3, // Random 3, 4, or 5 stars
              comment: reviewComments[Math.floor(Math.random() * reviewComments.length)]
            });
          }
        }
      }
    }

    console.log("Recalculating all course averages...");
    const allCourses = await Course.find();
    for (const c of allCourses) {
      await Review.calcAverageRatings(c._id);
    }

    console.log("\nSeed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seed();
