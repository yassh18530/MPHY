import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const saveUserData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("❌ No user is logged in");
    return;
  }

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    name: user.displayName || "New User",
    email: user.email,
    profilePic: user.photoURL || "",
    skills: ["HTML", "CSS", "JavaScript"],
    bio: "Welcome to the platform!",
  });

  console.log("✅ User data saved successfully!");
};
