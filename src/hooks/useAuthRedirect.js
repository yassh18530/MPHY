// src/hooks/useAuthRedirect.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthRedirect = () => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && (location.pathname === "/login" || location.pathname === "/signup")) {
        navigate("/");
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  return checking;
};
