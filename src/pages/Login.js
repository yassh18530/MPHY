import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import loginBg from "../assets/login-bg.jpg";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const checking = useAuthRedirect(); // blocks render if already logged in
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        navigate("/setup-profile");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  if (checking) return null; // don't render until auth state is confirmed

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to MPHYquest🚀</h1>
          <p className="text-lg">Your one-stop platform for notes, quizzes, exam preparation, and job readiness.</p>
          <div className="absolute bottom-5 text-sm text-gray-300">
            Made With <span className="text-red-500">❤️</span> By MPHY
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <button onClick={() => navigate("/forgot-password")} className="text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          <p className="mt-4 text-center">
            New User?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
