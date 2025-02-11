import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0D1117] text-white px-8 md:px-20 py-14 font-['Space_Grotesk']">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">🚀 CoursePro</h1>
          <p className="text-gray-400 text-sm">
            Empower your learning with top-tier courses curated by experts.
          </p>
          <button className="bg-[#B9FF66] text-black font-semibold px-4 py-2 rounded-md hover:bg-[#A0E34D] transition duration-300">
            Contact Us
          </button>
          <p className="text-gray-300 text-sm">Email: support@coursepro.com</p>
          <p className="text-gray-300 text-sm">Phone: +1 (555) 789-1234</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-6 text-gray-400 text-sm justify-center md:justify-start">
          {["About", "Courses", "Pricing", "Blog", "Careers", "Support"].map(
            (link, index) => (
              <a
                key={index}
                href="#"
                className="hover:text-white transition duration-300"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-[#161B22] p-5 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-white">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to our newsletter for course updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent border border-gray-600 text-white px-3 py-2 rounded-md w-full focus:outline-none"
            />
            <button className="bg-[#B9FF66] text-black px-4 py-2 rounded-md font-semibold ml-2 hover:bg-[#A0E34D] transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
        <p>© 2025 CoursePro. All Rights Reserved.</p>
        <a href="#" className="hover:text-white transition duration-300">
          Privacy Policy
        </a>
        {/* Social Icons */}
        <div className="flex space-x-5 mt-3 md:mt-0">
          {[
            {
              name: "LinkedIn",
              url: "https://linkedin.com",
              icon: "https://cdn-icons-png.flaticon.com/512/3536/3536505.png",
            },
            {
              name: "Facebook",
              url: "https://facebook.com",
              icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
            },
            {
              name: "Twitter",
              url: "https://twitter.com",
              icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="w-6 opacity-80 hover:opacity-100 transition duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
