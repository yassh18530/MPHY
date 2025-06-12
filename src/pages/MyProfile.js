import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.js";
import RightSidebar from "../components/RightSidebar.js";
import ProfileCard from "../components/ProfileCard.js";
import { auth, db } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
        <ProfileCard 
          name={user.name || "User"} 
          email={user.email || "No Email"} 
          profilePic={user.profileEmoji || "😊"}  // Emoji Avatar Instead of Image
          skills={user.skills || []} 
          bio={user.bio || "No Bio Available"} 
        />
      </div>
      <RightSidebar />
    </div>
  );
};

export default MyProfile;
