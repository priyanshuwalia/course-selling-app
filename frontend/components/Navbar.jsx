import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-700 to-purple-800 text-white p-4 fixed w-full z-50 shadow-lg "
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-3xl font-bold tracking-wide"
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/home")}
        >
          🚀 CoursePro
        </motion.h1>

        {/* Navigation Links */}
        <ul className=" md:flex space-x-8 text-lg">
          {["Home", "Courses", "Reviews", "Contact"].map((item, index) => (
            <motion.li
              key={index}
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {item}
              {/* Animated Underline */}
              <motion.div
                className="absolute left-0 w-full h-1 bg-white rounded-full"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.li>
          ))}
        </ul>

        {/* Sign Up Button */}
        <div className="flex gap-2 ">
          <motion.button
            className=" md:block px-6 py-2 bg-white text-blue-800 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </motion.button>
          <motion.button
            className=" md:block px-6 py-2 bg-white text-blue-800 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/login")}
          >
            Login
          </motion.button>
        </div>

        {/* Mobile Menu (Optional for future updates) */}
      </div>
    </motion.nav>
  );
};

export default Navbar;
