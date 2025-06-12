import React, { useState } from "react";
import Sidebar from "../components/Sidebar.js";

const placementQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Machine Learning",
      "Home Tool Markup Language",
      "Hyper Transfer Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS",
  },
  {
    question: "Which JavaScript framework is maintained by Meta (formerly Facebook)?",
    options: ["Angular", "Vue", "React", "Svelte"],
    answer: "React",
  },
];

const subjectQuestions = [
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(log n)",
  },
  {
    question: "Which data structure follows LIFO order?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    answer: "Stack",
  },
  {
    question: "Which of the following is a NoSQL database?",
    options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
    answer: "MongoDB",
  },
];

const QuizSection = ({ questions, onRestart }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore(score + 1);
      }

      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    } else {
      alert("Please select an answer!");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      {showResult ? (
        <div className="text-center">
          <h3 className="text-lg font-semibold">Quiz Completed!</h3>
          <p className="text-gray-700">Your Score: {score} / {questions.length}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onRestart}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{questions[currentQuestion].question}</h3>
          <div className="mt-4 space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-3 text-left border rounded-md ${
                  selectedOption === option ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full" onClick={handleNextQuestion}>
            {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
};

const Quiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Quiz</h1>

        {!selectedQuiz ? (
          <div className="flex gap-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg" onClick={() => setSelectedQuiz("placement")}>
              Take Placement Quiz
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg" onClick={() => setSelectedQuiz("college")}>
              Take College Subjects Quiz
            </button>
          </div>
        ) : (
          <QuizSection
            questions={selectedQuiz === "placement" ? placementQuestions : subjectQuestions}
            onRestart={() => setSelectedQuiz(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
