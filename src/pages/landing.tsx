import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { LOCAL_STORAGE_ACCESS_TOKEN } from "@/lib/utils.ts";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    if (accessToken) {
      // If token exists in localStorage, user is already authenticated
      // You can also add token validation logic here if needed
      navigate("/home");
    }
  }, [navigate]);

  const handleEnter = () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    if (accessToken) {
      navigate("/home");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
      {/* Gradient orbs in the background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zinc-800/50 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1 className="text-8xl font-bold mb-6 tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
          Study Adda
        </h1>
        <p className="text-2xl text-zinc-400 tracking-wide mb-12">
          Get locked in
        </p>
        <button
          onClick={handleEnter}
          className="group relative inline-flex items-center justify-center mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur-sm transition-all duration-500 group-hover:blur-md" />
          <div className="relative bg-black border border-white/20 hover:border-white/40 text-white px-10 py-4 rounded-full font-medium transition-all duration-300 flex items-center gap-3">
            <span className="text-lg tracking-wide">Enter</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </div>
  );
};
