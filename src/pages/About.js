import React from "react";
import Sidebar from "../components/Sidebar.js";
import RightSidebar from "../components/RightSidebar.js";

// Import images (if using `src/assets`)
import manjiriImage from "../assets/manjiri.jpg";
import harshaliImage from "../assets/harshali.jpg";
import parthImage from "../assets/parth.jpg";
import yashImage from "../assets/yash.jpeg";
import hodmamImage from "../assets/hodmam.jpg";

// Team data
const teamMembers = [
  {
    name: "Prof. Aparna Mote",
    role: "Faculty Mentor",
    description: "Guides the team with expert advice and supervision.",
    image: hodmamImage,
  },
  {
    name: "Manjiri Chaukaskar",
    role: "Frontend Developer",
    description: "Passionate about UI/UX and frontend development.",
    image: manjiriImage,
  },
  {
    name: "Harshali Bagul",
    role: "Backend Developer",
    description: "Handles the server-side and database management.",
    image: harshaliImage,
  },
  {
    name: "Parth Badrayani",
    role: "UI/UX Designer",
    description: "Ensures a smooth and visually appealing user experience.",
    image: parthImage,
  },
  {
    name: "Yash Ahirrao",
    role: "Full Stack developer",
    description: "Skilled in both frontend and backend development.",
    image: yashImage,
  },

];

const About = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-600 text-center">About Us</h1>
        <p className="mt-2 text-gray-700 text-center">Meet our amazing team behind TalentBridge!</p>

        {/* Team Members - All in one row at the same level */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center w-56">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              />
              <h2 className="text-lg font-semibold text-blue-500 mt-2">{member.name}</h2>
              <p className="text-sm font-medium text-gray-600">{member.role}</p>
              <p className="text-gray-700 mt-1 text-center">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default About;
