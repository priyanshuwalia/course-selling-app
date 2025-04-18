import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });
      const { token, role } = response.data;

      localStorage.setItem("token", token); // Store token
      localStorage.setItem("role", role);
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-black ">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">
        {/* Left Side - Illustration */}
        <div className=" md:flex bg-white  p-10 justify-center items-center w-1/2">
          <img
            src="/illustration1.png"
            alt="Login Illustration"
            className="w-210 -"
          />
        </div>

        {/* Right Side - Form */}
        <div className=" bg-gray-200 p-10 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            🚀 CoursePro
          </h1>
          <h1 className="text-2xl font-bold  mb-6 flex   gap-2"> Login</h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-lg mt-2 hover:bg-gray-900"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
