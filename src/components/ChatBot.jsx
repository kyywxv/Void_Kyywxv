import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2 } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo! Saya Kyywxv AI. Ada yang bisa saya bantu tentang portofolio ini?", sender: "bot", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulasi respon AI
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.text);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase().trim();
    
    // GREETINGS
    if (text === "p" || text === "halo" || text === "hai" || text === "hi" || text === "hello" || text === "hey" || text === "assalamualaikum" || text === "hallo ai") {
      const responses = [
        "Halo! Senang sekali Anda berkunjung. Ada yang bisa saya bantu jelaskan tentang karya-karya Kyywxv?",
        "Hai! Saya Kyywxv AI. Saya di sini untuk membantu Anda menjelajahi portofolio ini. Apa yang ingin Anda ketahui?",
        "Halo! Selamat datang di dunia digital Kyywxv. Mau tahu lebih banyak tentang proyek atau pengalaman saya?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // PROFILE / WHO IS
    if (text.includes("siapa") || text.includes("profil")|| text.includes("siapa itu ikyy") || text.includes("kyywxv")) {
      return "Kyywxv (Muhammad Rizki) adalah seorang Front Web Developer yang sangat antusias dalam membangun antarmuka web yang interaktif dan futuristik. Dia percaya bahwa setiap baris kode adalah seni, Dan dia pernah bilang ke aku juga sebagian kode nya ini dibantu sama AI xixi, jangan kasih tau dia yaa, ini rahasia kita aja Ingin tahu tentang project-nya?";
    }

    // PROJECTS
    if (text.includes("proyek") || text.includes("portofolio") || text.includes("project") || text.includes("karya")) {
      return "Kyywxv telah membangun banyak hal keren! Mulai dari landing page yang smooth, dashboard admin, hingga eksperimen 3D. Anda bisa melihat semuanya di bagian 'Portfolio' dengan scroll ke bawah sedikit.";
    }

    // SKILLS
    if (text.includes("skill") || text.includes("keahlian") || text.includes("bisa apa") || text.includes("teknologi")) {
      return "Keahlian utama Kyywxv ada di Frontend Development (React.js, Tailwind, Framer Motion). Dia juga hobi bereksperimen dengan animasi dan desain UI yang clean. Keren kan?";
    }

    // CONTACT
    if (text.includes("kontak") || text.includes("hubungi") || text.includes("email") || text.includes("sosmed")) {
      return "Wah, mau kolaborasi ya? Silakan scroll ke bagian paling bawah (Contact), atau gunakan link sosial media yang ada di sidebar. Ikyy sangat terbuka untuk diskusi baru!";
    }

    // COMPLIMENTS / CLOSING
    if (text.includes("keren") || text.includes("mantap")|| text.includes("gacur") || text.includes("gacor") || text.includes("bagus")) {
      return "Terima kasih banyak! Ikyy pasti senang mendengarnya. Ada lagi yang mau ditanyakan?";
    }

    if (text.includes("terima kasih") || text.includes("thanks") || text.includes("makasih")) {
      return "Sama-sama! Senang bisa menemanimu di sini.! 😊";
    }

    // DEFAULT
    return "Pertanyaan menarik! Sayangnya database saya terbatas, tapi saya bisa cerita tentang Proyek, Skill, atau Profil Kyywxv. Mau coba tanya salah satunya?";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] sm:w-[380px] h-[500px] bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <Bot className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Kyywxv AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-400">Online | Assistant</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <Minimize2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                      msg.sender === 'user' ? 'bg-white/10 border-white/20' : 'bg-gray-800 border-white/10'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-300" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-white/10 text-white rounded-tr-none border border-white/20' 
                        : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1 p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-black to-zinc-800 shadow-lg shadow-white/5 group overflow-hidden border border-white/10"
      >
        <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full" />
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
