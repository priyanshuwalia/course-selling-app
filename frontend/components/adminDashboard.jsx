import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiBook, FiUsers, FiFileText, FiLogOut } from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ courses: 0, students: 0, quizzes: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/admin/stats",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <button className="flex items-center gap-2 hover:bg-gray-700 p-3 rounded-lg w-full">
            <FiBook /> Manage Courses
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 p-3 rounded-lg w-full">
            <FiUsers /> Manage Users
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 p-3 rounded-lg w-full">
            <FiFileText /> Manage Quizzes
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-lg w-full"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h2 className="text-xl font-semibold">Total Courses</h2>
              <p className="text-gray-600">{stats.courses}</p>
            </div>
            <FiBook size={40} className="text-blue-600" />
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h2 className="text-xl font-semibold">Total Students</h2>
              <p className="text-gray-600">{stats.students}</p>
            </div>
            <FiUsers size={40} className="text-green-600" />
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h2 className="text-xl font-semibold">Total Quizzes</h2>
              <p className="text-gray-600">{stats.quizzes}</p>
            </div>
            <FiFileText size={40} className="text-yellow-600" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
