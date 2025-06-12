import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "../components/ChatCard.js";
import ReactPlayer from "react-player";
import {
  FaPaperPlane,
  FaHome,
  FaTrash,
  FaMicrophone,
  FaVolumeUp,
  FaStop,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { auth, db } from "../firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) setMessages([]);
    });
    return () => unsubscribe();
  }, []);

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    const sr = new window.webkitSpeechRecognition();
    sr.lang = "en-US";
    sr.continuous = false;
    sr.interimResults = false;
    sr.onstart = () => setIsListening(true);
    sr.onend = () => setIsListening(false);
    sr.onresult = (e) => setInput(e.results[0][0].transcript);
    sr.start();
  };

  const sendMessage = async () => {
    const user = auth.currentUser;
    if (!input.trim() || !user) return;
    setLoading(true);

    const userMsg = { role: "user", content: input };
    const updated = [...messages, userMsg];
    setMessages(updated);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Server error");

      const { reply, videos } = await res.json();

      const botMsg = { role: "assistant", content: reply };
      const finalMsgs = [...updated, botMsg];

      if (videos && videos.length > 0) {
        const videoMsgs = videos.map((v) => ({
          role: "video",
          content: v.url,
          title: v.title,
          thumbnail: v.thumbnail,
        }));
        finalMsgs.push(...videoMsgs);
      }

      setMessages(finalMsgs);

      await updateDoc(doc(db, "users", user.uid), {
        latestSession: finalMsgs,
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
    setInput("");
  };

  const clearChat = () => {
    if (window.confirm("Clear current chat session?")) {
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
        <span className="text-2xl font-bold">Chat with Ora 🤖</span>
        <div className="space-x-3">
          <button
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700"
            onClick={clearChat}
          >
            <FaTrash className="inline mr-1" /> Clear
          </button>
          <button
            className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={() => navigate("/")}
          >
            <FaHome className="inline mr-1" /> Home
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "video" ? (
              <div className="bg-gray-700 p-3 rounded-lg max-w-sm">
                <ReactPlayer url={msg.content} controls width="100%" height="200px" />
                <p className="text-sm text-white mt-1">{msg.title}</p>
              </div>
            ) : (
              <ChatCard {...msg} />
            )}

            {msg.role === "assistant" && (
              <div className="flex space-x-2 ml-2">
                <button
                  className="bg-blue-600 p-2 rounded-md"
                  onClick={() => speakText(msg.content)}
                  disabled={isSpeaking}
                >
                  <FaVolumeUp />
                </button>
                <button
                  className="bg-red-600 p-2 rounded-md"
                  onClick={stopSpeaking}
                  disabled={!isSpeaking}
                >
                  <FaStop />
                </button>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-lg opacity-80">
            Ora is thinking... 🤔
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="bg-gray-800 p-3 flex items-center border-t">
        <input
          type="text"
          className="flex-1 rounded-full bg-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className={`ml-3 bg-green-600 px-4 py-3 rounded-full ${isListening ? "opacity-50" : ""}`}
          onClick={startListening}
          disabled={isListening}
        >
          <FaMicrophone className="mr-1 inline" /> Speak
        </button>
        <button
          className={`ml-3 bg-blue-600 px-5 py-3 rounded-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={sendMessage}
          disabled={loading}
        >
          <FaPaperPlane className="mr-1 inline" /> Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
