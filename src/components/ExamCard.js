import React from "react";
import { FaBookOpen } from "react-icons/fa";

const ExamCard = ({ title, date, subject, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
      <h2 className="text-lg font-semibold text-blue-700">{title}</h2>
      <p className="text-gray-500">{subject} • {date}</p>
      <p className="mt-2 text-gray-700">{description}</p>
      <a href={link} className="mt-4 flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all">
        <FaBookOpen className="mr-2" /> Start Preparing
      </a>
    </div>
  );
};

export default ExamCard;
