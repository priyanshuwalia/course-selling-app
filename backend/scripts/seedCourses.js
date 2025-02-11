const mongoose = require("mongoose");
const Course = require("../models/Course"); // Adjust path based on your project structure

mongoose.connect("mongodb://127.0.0.1:27017/yourDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const courses = [
  {
    title: "JavaScript for Beginners",
    description: "Learn JavaScript from scratch.",
    price: 999,
  },
  {
    title: "React Masterclass",
    description: "Deep dive into React and Hooks.",
    price: 1499,
  },
  {
    title: "Node.js & Express Bootcamp",
    description: "Build backend apps using Node.js & Express.",
    price: 1299,
  },
];

const seedCourses = async () => {
  try {
    await Course.deleteMany(); // Clears old data
    await Course.insertMany(courses);
    console.log("✅ Courses seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
    mongoose.connection.close();
  }
};

seedCourses();
