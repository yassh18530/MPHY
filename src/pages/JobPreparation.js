import React from "react";
import Sidebar from "../components/Sidebar.js";

const jobResources = [
  {
    title: "Resume Building Guide",
    description: "Learn how to create an ATS-friendly resume with impactful content.",
    link: "https://www.resumeworded.com/",
  },
  {
    title: "Common Interview Questions",
    description: "Prepare with the most frequently asked technical and HR interview questions.",
    link: "https://www.geeksforgeeks.org/hr-interview-questions-with-answers/",
  },
  {
    title: "Aptitude Preparation",
    description: "Boost your problem-solving skills with aptitude tests and logical reasoning exercises.",
    link: "https://www.indiabix.com/",
  },
  {
    title: "Top Coding Platforms",
    description: "Practice coding problems to ace technical interviews.",
    link: "https://www.leetcode.com/",
  },
  {
    title: "Latest Job Listings",
    description: "Stay updated with job openings and apply for internships & full-time roles.",
    link: "https://www.linkedin.com/jobs/",
  },
];

const JobPreparation = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Job Preparation</h1>
        <div className="space-y-6">
          {jobResources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{resource.title}</h2>
              <p className="text-gray-700">{resource.description}</p>
              <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobPreparation;
