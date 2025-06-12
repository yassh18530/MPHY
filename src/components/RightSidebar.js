import React from "react";
import { motion } from "framer-motion";

const RightSidebar = () => {
  // Trending topics
  const trendingTopics = [
    "📌 AI in Education",
    "📌 Top 10 Coding Resources",
    "📌 Resume Tips for Freshers",
    "📌 Web 3.0 and Blockchain",
  ];



  
  const techBlogs = [
    { title: "🚀 The Future of AI in Tech", link: "https://techcrunch.com/" },
    { title: "💻 Top 10 Web Dev Trends 2025", link: "https://www.smashingmagazine.com/" },
    { title: "🛠️ How to Build a Strong GitHub Profile", link: "https://dev.to/" },
    { title: "📊 Data Science: Career Path & Skills", link: "https://towardsdatascience.com/" },
    { title: "🎨 UI/UX Trends in 2025", link: "https://uxdesign.cc/" },
  ];

  return (
    <div className="w-72 h-screen bg-gradient-to-br from-gray-200 to-gray-100 p-4 shadow-md flex flex-col justify-between">
      
      {/* 🔥 Trending Topics Section */}
      <div>
        <h2 className="text-xl font-bold text-blue-600 border-b pb-2 border-gray-300">
          🔥 Trending Topics
        </h2>
        <ul className="mt-3 space-y-2">
          {trendingTopics.map((topic, index) => (
            <motion.li
              key={index}
              className="p-3 bg-white rounded-md shadow-sm hover:bg-blue-100 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              {topic}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* 📝 Tech News & Blogs Section */}
      <div>
        <h2 className="text-xl font-bold text-purple-600 border-b pb-2 border-gray-300">
          📰 Tech News & Blogs
        </h2>
        <ul className="mt-3 space-y-2">
          {techBlogs.map((blog, index) => (
            <motion.li
              key={index}
              className="p-3 bg-white rounded-md shadow-sm hover:bg-purple-100 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-medium">
                {blog.title}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default RightSidebar;
