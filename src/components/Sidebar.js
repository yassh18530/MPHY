import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Import Firebase Auth
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { FaHome, FaUser, FaStickyNote, FaBook, FaQuestionCircle, FaBriefcase, FaRobot, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";



const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // Check if user is logged in

  const links = [
    { path: "/", name: "Home", icon: <FaHome /> },
    { path: "/my-profile", name: "My Profile", icon: <FaUser /> },
    { path: "/notes", name: "Notes", icon: <FaStickyNote /> },
    { path: "/exam-preparation", name: "Exam Preparation", icon: <FaBook /> },
    { path: "/quiz", name: "Quiz", icon: <FaQuestionCircle /> },
    { path: "/job-preparation", name: "Job Preparation", icon: <FaBriefcase /> },
    { path: "/chat", name: "Chat With Ora!!", icon: <FaRobot /> },
    { path: "/about", name: "About Us", icon: <FaInfoCircle /> } // Add About Us link
  ];
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-blue-600">MPHYquest🚀</h1>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center p-4 text-gray-700 hover:bg-blue-100 transition-all rounded-md mx-3 ${
              location.pathname === link.path ? "bg-blue-500 text-white" : ""
            }`}
          >
            <span className="text-xl mr-3">{link.icon}</span>
            <span className="font-medium">{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      {user && (
        <button
          onClick={handleLogout}
          className="flex items-center p-4 text-gray-700 hover:bg-red-100 transition-all rounded-md mx-3 mt-auto mb-4"
        >
          <FaSignOutAlt className="text-xl mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      )}

      {/* Footer Section */}
      <div className="p-4 text-sm text-gray-500 text-center border-t border-gray-200">
        © {new Date().getFullYear()} EduBot
      </div>
    </div>
  );
};

export default Sidebar;
