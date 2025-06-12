import React, { useState } from "react";

const cartoonAvatars = [
  "https://api.dicebear.com/7.x/adventurer/svg?seed=1",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=2",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=3",
  "https://api.dicebear.com/7.x/adventurer/svg?seed=4",
];

const ProfileCard = ({ name, email, profilePic, skills, bio }) => {
  const [useEmoji, setUseEmoji] = useState(true);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      {/* Toggle Between Emoji & Cartoon Avatar */}
      <div 
        className="cursor-pointer" 
        onClick={() => setUseEmoji(!useEmoji)}
        title="Click to change avatar"
      >
        {useEmoji ? (
          <div className="text-6xl">{profilePic}</div>  // Emoji Avatar
        ) : (
          <img 
            className="w-24 h-24 rounded-full mx-auto mb-4" 
            src={cartoonAvatars[Math.floor(Math.random() * cartoonAvatars.length)]} 
            alt="Cartoon Avatar"
          />
        )}
      </div>

      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-500">{email}</p>
      <p className="mt-4">{bio}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="flex flex-wrap justify-center mt-2">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-blue-500 text-white px-3 py-1 rounded-full m-1 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
