import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import RightSidebar from "../components/RightSidebar";

const ExamPreparation = () => {
  const [exams, setExams] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedExamId, setExpandedExamId] = useState(null);

  useEffect(() => {
    setExams([
      {
        id: 1,
        title: "GATE – Computer Science",
        date: "April 15, 2025",
        subject: "CS & IT",
        difficulty: "Intermediate",
        resources: 3,
        description:
          "Structured materials covering core CS topics and past year GATE papers.",
        materials: [
          {
            name: "Data Structures & Algorithms",
            link: "https://www.geeksforgeeks.org/data-structures/",
          },
          {
            name: "Operating Systems IITB Lecture Notes",
            link: "https://people.iitism.ac.in/~mritunjay/MKSLN.pdf",
          },
          {
            name: "GATE Question Papers",
            link: "https://gate2025.iitr.ac.in/question-papers.html",
          },
        ],
      },
      {
        id: 2,
        title: "UPSC – Civil Services",
        date: "May 10, 2025",
        subject: "General Studies",
        difficulty: "Advanced",
        resources: 3,
        description:
          "Comprehensive UPSC GS prep: polity, history, geography, & PYQs.",
        materials: [
          {
            name: "Indian Polity – Laxmikanth Summary PDF",
            link: "https://cdn.visionias.in/value_added_material/5ca16-polity.pdf",
          },
          {
            name: "Modern Indian History – Bipin Chandra Notes",
            link: "https://compass.rauias.com/modern-history/",
          },
          {
            name: "UPSC GS Prelims 2025 Question Paper",
            link: "https://vajiram-prod.s3.ap-south-1.amazonaws.com/Prelims_2025_Set_A_7cdeed24ac.pdf",
          },
        ],
      },
      {
        id: 3,
        title: "CAT – MBA Entrance",
        date: "June 5, 2025",
        subject: "Quant & Verbal",
        difficulty: "Moderate",
        resources: 3,
        description: "Focused CAT prep: QA, VARC & LRDI practice materials.",
        materials: [
          {
            name: "Quantitative Aptitude – Arun Sharma Sample PDF",
            link: "https://books.google.com/books/content?id=qzAnDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
          },
          {
            name: "Verbal Ability Practice PDF",
            link: "https://files.catpreparation.com/resources/CAT_Verbal_Practice.pdf",
          },
          {
            name: "Logical Reasoning – LRDI Exercises",
            link: "https://www.hitbullseye.com/static/pdf/logical-reasoning.pdf",
          },
        ],
      },
    ]);
  }, []);

  const toggle = (id) =>
    setExpandedExamId(expandedExamId === id ? null : id);

  const filtered = exams.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          📚 Exam Preparation Hub
        </h1>

        <div className="bg-blue-100 p-4 rounded-lg mb-6 border border-blue-300">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Resources for Competitive Exams
          </h2>
          <p className="text-gray-700">
            Download top-quality PDFs for GATE, UPSC, and CAT—covering concepts,
            practice sets, and past year questions.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search exams..."
            className="w-full p-3 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {filtered.length > 0 ? (
            filtered.map((exam) => (
              <div
                key={exam.id}
                className="bg-white p-6 rounded-xl shadow-md border"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-blue-600">
                    {exam.title}
                  </h2>
                  <span className="text-sm text-gray-500">{exam.date}</span>
                </div>

                <p className="mt-2 text-gray-700">{exam.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                  <span className="badge">{exam.subject}</span>
                  <span className="badge">{exam.difficulty}</span>
                  <span>{exam.resources} Resources</span>
                </div>

                <button
                  onClick={() => toggle(exam.id)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {expandedExamId === exam.id
                    ? "Hide Materials"
                    : "Start Preparing"}
                </button>

                {expandedExamId === exam.id && (
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      📘 Download Materials:
                    </h4>
                    <ul className="list-disc ml-6 space-y-2 text-blue-700">
                      {exam.materials.map((mat, idx) => (
                        <li key={idx}>
                          <a
                            href={mat.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {mat.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No exams found!</p>
          )}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default ExamPreparation;
