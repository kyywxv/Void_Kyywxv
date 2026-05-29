import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User, ArrowRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/5 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-white/10 to-white/10 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize audio
    const introAudio = new Audio('/SFX2.mp3');
    introAudio.volume = 0.8;
    introAudio.loop = false;
    setAudio(introAudio);

    return () => {
      // Kita tidak mematikan audio di sini agar sfx 9 detik 
      // tetap berlanjut saat masuk ke Home
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    // Menampilkan tombol setelah animasi teks awal selesai
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    // Play sound immediately on click
    if (audio) {
      audio.play().catch(e => console.log("Audio play error:", e));
    }

    setIsLoading(false);
    setTimeout(() => {
      onLoadingComplete?.();
    }, 600);
  };

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: {
      y: -20,
      opacity: 0,
       transition: { duration: 0.4 }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030303] z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          
          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div 
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Code2, User, Github].map((Icon, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div 
                className="text-center mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span data-aos="fade-right" data-aos-delay="200" className="inline-block px-2 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                      Welcome
                    </span>{' '}
                    <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-2 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                      To
                    </span>
                  </div>
                  <div>
                    <span data-aos="fade-up" data-aos-delay="600" className="inline-block px-2 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent italic tracking-widest">
                      Void
                    </span>{' '}
                  </div>
                </h1>
              </motion.div>

              {/* Enter Button */}
              <AnimatePresence>
                {showButton && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={handleButtonClick}
                      className="group relative px-8 py-3 rounded-full bg-transparent border border-white/20 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/10 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                      <div className="relative flex items-center gap-2">
                        <span>Explore Now</span>
                        <ArrowRight className="w-4 h-4 group-hover:translateX(5px) transition-transform duration-300" />
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;