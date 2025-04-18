import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLogOut, FiBook, FiHome, FiShoppingCart } from "react-icons/fi";

const StudentDashboard = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        const purchasedRes = await axios.get(
          "http://localhost:3000/api/courses/purchased",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const availableRes = await axios.get(
          "http://localhost:3000/api/courses/all",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setPurchasedCourses(purchasedRes.data);
        setAvailableCourses(availableRes.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col items-center py-6">
        <h2 className="text-xl font-bold mb-8">Dashboard</h2>

        <nav className="w-full">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 px-6 py-3 hover:bg-blue-600 cursor-pointer">
              <FiHome className="text-lg" /> Home
            </li>
            <li className="flex items-center gap-3 px-6 py-3 hover:bg-blue-600 cursor-pointer">
              <FiBook className="text-lg" /> My Courses
            </li>
            <li className="flex items-center gap-3 px-6 py-3 hover:bg-blue-600 cursor-pointer">
              <FiShoppingCart className="text-lg" /> Available Courses
            </li>
            <li
              className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              <FiLogOut className="text-lg" /> Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>

        {purchasedCourses.length === 0 ? (
          <p className="text-gray-500 text-lg">
            You haven't purchased any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                </div>
                <div className="bg-green-500 text-white text-center py-2 cursor-pointer hover:bg-green-600">
                  View Course
                </div>
              </div>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold mt-12 mb-6">Available Courses</h1>

        {availableCourses.length === 0 ? (
          <p className="text-gray-500 text-lg">No new courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                </div>
                <div className="bg-blue-500 text-white text-center py-2 cursor-pointer hover:bg-blue-600">
                  Buy Course
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
