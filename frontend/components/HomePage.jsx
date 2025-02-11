import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";

gsap.registerPlugin(ScrollTrigger);
const stats = [
  { label: "Learners", value: 10000, icon: "📚" },
  { label: "Expert Courses", value: 500, icon: "🎓" },
  { label: "Success Rate", value: "98%", icon: "⭐" },
];

export default function HomePage() {
  useEffect(() => {
    gsap.from(".feature", {
      scrollTrigger: {
        trigger: ".features",
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      stagger: 0.3,
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-8">
        <motion.h1
          className="hero-text text-5xl md:text-7xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Master New Skills Anytime, Anywhere
        </motion.h1>

        <p className="mt-4 text-lg text-gray-300 max-w-2xl">
          Join thousands of learners and take the first step towards upskilling.
        </p>
        <br />
        <br />

        <motion.button
          className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </section>

      {/* Our Platform at a Glance */}
      <section className="features py-20 text-center bg-gray-900">
        <h2 className="text-4xl font-bold mb-12 text-white">
          Our Platform at a Glance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-8">
          {[
            {
              title: "Top-Tier Instructors",
              description:
                "Learn from industry experts and certified professionals.",
              icon: "🎓",
            },
            {
              title: "Immersive Learning",
              description:
                "Engage with interactive lessons and hands-on projects.",
              icon: "📚",
            },
            {
              title: "Career Growth",
              description:
                "Earn certifications that boost your job opportunities.",
              icon: "🚀",
            },
            {
              title: "Community Support",
              description: "Join a thriving community of passionate learners.",
              icon: "🤝",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="feature bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="text-5xl">{item.icon}</div>
              <h3 className="text-2xl font-semibold mt-4 text-white">
                {item.title}
              </h3>
              <p className="text-gray-400 mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              <span className="text-5xl">{stat.icon}</span>
              <motion.h2
                className="text-4xl font-bold mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: index * 0.3 }}
              >
                {typeof stat.value === "number"
                  ? stat.value.toLocaleString()
                  : stat.value}
              </motion.h2>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Parallax Section */}
      <div
        className="h-[300px] bg-fixed bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://source.unsplash.com/1600x900/?technology)",
        }}
      >
        <h2 className="text-3xl font-bold bg-black/50 px-4 py-2 rounded-md">
          Join Our Community
        </h2>
      </div>

      {/* Reviews Section */}
      <Reviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}
