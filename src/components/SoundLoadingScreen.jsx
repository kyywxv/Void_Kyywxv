import React, { memo } from "react";
import { Sparkles } from "lucide-react";

const LoadingScreen = ({ onEnter }) => {
  const handlePlayWelcome = () => {
    // Memanggil file audio dari folder public
    const audio = new Audio("/welcome.mp3");
    audio.volume = 0.6; // Atur volume (0.0 sampai 1.0)
    audio.play().catch((err) => console.log("Audio play diblokir:", err));

    // Picu fungsi untuk membuka halaman utama
    if (onEnter) onEnter();
  };

  return (
    <div className="fixed inset-0 bg-[#030014] flex flex-col items-center justify-center z-50 px-4">
      {/* Background Orbs Effect */}
      <div className="absolute w-56 h-56 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="relative flex flex-col items-center text-center space-y-4">
        {/* Ikon / Logo Kecil */}
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-bounce">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>

        {/* Teks Sambutan */}
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
            WELCOME TO PORTFOLIO
          </h1>
          <p className="text-xs text-gray-400 font-light max-w-xs mx-auto">
            Transforming ideas into digital experiences
          </p>
        </div>

        {/* Tombol Masuk */}
        <button
          onClick={handlePlayWelcome}
          className="mt-4 px-6 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white text-xs font-medium tracking-wide shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default memo(LoadingScreen);