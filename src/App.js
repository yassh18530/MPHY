import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.js"; 
import Home from "./pages/Home.js";
import Notes from "./pages/Notes.js";
import MyProfile from "./pages/MyProfile.js";
import Chat from "./pages/Chat.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import JobPreparation from "./pages/JobPreparation.js";
import Quiz from "./pages/Quiz.js";
import ExamPreparation from "./pages/ExamPreparation.js";
import SetupProfile from "./pages/SetupProfile.js";
import About from "./pages/About.js";

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const [user] = useAuthState(auth);
  return user ? element : <Navigate to="/login" />;
};
  
const AppLayout = () => (
  <>

    <Routes>
      <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      <Route path="/notes" element={<ProtectedRoute element={<Notes />} />} />
      <Route path="/my-profile" element={<ProtectedRoute element={<MyProfile />} />} />
      <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
      <Route path="/exam-preparation" element={<ProtectedRoute element={<ExamPreparation />} />} />
      <Route path="/job-preparation" element={<ProtectedRoute element={<JobPreparation />} />} />
      <Route path="/quiz" element={<ProtectedRoute element={<Quiz />} />} />
      <Route path="/about" element={<ProtectedRoute element={<About />} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/setup-profile" element={<SetupProfile />} />
    </Routes>
   
  </>
);

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
