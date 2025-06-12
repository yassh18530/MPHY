import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase"; 
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import MyProfile from "./pages/MyProfile";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobPreparation from "./pages/JobPreparation";
import Quiz from "./pages/Quiz";
import ExamPreparation from "./pages/ExamPreparation";
import SetupProfile from "./pages/SetupProfile";
import About from "./pages/About";

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
