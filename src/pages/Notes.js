import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.js";
import RightSidebar from "../components/RightSidebar.js";
import NotesCard from "../components/NotesCard.js";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  useEffect(() => {
    setNotes([
      {
        id: 1,
        title: "Data Structures & Algorithms",
        subject: "Computer Science",
        date: "2019 Pattern",
        description: "Sorting, searching, graphs, trees & more in-depth DSA notes.",
        link: "https://www.geeksforgeeks.org/data-structures/"
      },
      {
        id: 2,
        title: "Operating System Concepts",
        subject: "Computer Science",
        date: "2019 Pattern",
        description: "Scheduling, concurrency, memory, virtual memory, OS design.",
        link: "https://www.geeksforgeeks.org/operating-systems/"
      },
      {
        id: 3,
        title: "Database Management Systems",
        subject: "Computer Science",
        date: "2019 Pattern",
        description: "Relational models, SQL, normalization, indexing, transactions.",
        link: "https://www.geeksforgeeks.org/dbms/dbms/"
      },
      {
        id: 4,
        title: "Microprocessor Fundamentals",
        subject: "Computer Science",
        date: "2019 Pattern",
        description: "Architecture, interfacing, 8085 microprocessor in detail.",
        link: "https://www.geeksforgeeks.org/introduction-of-microprocessor/"
      },
      {
        id: 5,
        title: "Computer Networks - TCP/IP",
        subject: "Computer Science",
        date: "2020 Pattern",
        description: "Network layers, protocols, routing, IP/TCP/UDP explained.",
        link: "https://www.geeksforgeeks.org/computer-networks/computer-network-tutorials/"
      },
    ]);
  }, []);

  const subjects = ["All", ...Array.from(new Set(notes.map(n => n.subject)))];
  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                          n.description.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === "All" || n.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">📚 Notes Repository</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border rounded-lg"
          />
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="p-3 border rounded-lg w-full md:w-48"
          >
            {subjects.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Notes List */}
        <div className="space-y-6">
          {filteredNotes.length ? (
            filteredNotes.map(note => <NotesCard key={note.id} {...note} />)
          ) : (
            <p className="text-gray-500 text-center">No notes found.</p>
          )}
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Notes;
