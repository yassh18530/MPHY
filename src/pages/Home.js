import React from "react";
import Sidebar from "../components/Sidebar.js";
import RightSidebar from "../components/RightSidebar.js";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Hero Section */}
        <div className="bg-blue-500 dark:bg-blue-700 text-white p-10 rounded-lg text-center shadow-md">
          <h1 className="text-3xl font-bold">Welcome to MPHYquest🚀</h1>
          <p className="text-lg mt-2">Your Smart Learning Companion 📚</p>
          <Link to="/exam-preparation">
            <button className="mt-4 px-6 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-white font-semibold rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700">
              Start Learning
            </button>
          </Link>
        </div>

        {/* Quick Links Section */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/notes" className="p-4 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 font-medium rounded-md text-center shadow hover:bg-blue-200 dark:hover:bg-blue-700">
            📖 Study Notes
          </Link>
          <Link to="/exam-preparation" className="p-4 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 font-medium rounded-md text-center shadow hover:bg-green-200 dark:hover:bg-green-700">
            📚 Exam Prep
          </Link>
          <Link to="/quiz" className="p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200 font-medium rounded-md text-center shadow hover:bg-yellow-200 dark:hover:bg-yellow-700">
            🧠 Quiz Practice
          </Link>
          <Link to="/job-preparation" className="p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 font-medium rounded-md text-center shadow hover:bg-red-200 dark:hover:bg-red-700">
            💼 Job Prep
          </Link>
          <Link to="/chat" className="p-4 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 font-medium rounded-md text-center shadow hover:bg-purple-200 dark:hover:bg-purple-700">
            🤖 Chatbot
          </Link>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default Home;
