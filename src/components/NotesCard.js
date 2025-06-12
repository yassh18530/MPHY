import React from "react";
import { FaDownload } from "react-icons/fa";

const NotesCard = ({ title, subject, date, description, link }) => (
  <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer"
         className="text-blue-600 hover:text-blue-800">
        <FaDownload className="inline mr-1" />
        View
      </a>
    </div>
    <p className="text-gray-600 mt-1">{subject} · {date}</p>
    <p className="text-gray-700 mt-3">{description}</p>
  </div>
);

export default NotesCard;
