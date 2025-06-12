import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const emojis = ["😊", "🚀", "🔥", "🌟", "😎", "💻", "🎯", "✨", "👨‍💻", "🎉"];

const SetupProfile = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    await updateDoc(doc(db, "users", user.uid), {
      name,
      bio,
      skills: skills.split(",").map((skill) => skill.trim()),
      profileEmoji: randomEmoji,
    });

    setLoading(false);
    alert("Profile updated successfully! 🎉");
    navigate("/my-profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <div className="flex justify-center mb-6">
          <span className="text-4xl">{randomEmoji}</span>
        </div>
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Setup Your Profile
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            placeholder="Write a short bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
            Skills (comma separated)
          </label>
          <input
            type="text"
            id="skills"
            placeholder="e.g., React, Node.js, Design"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default SetupProfile;