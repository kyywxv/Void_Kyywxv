import { useEffect } from "react";
import {
  Linkedin,
  Github,
  Instagram,
  ExternalLink,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const socialLinks = [
  // {
  //   name: "LinkedIn",
  //   displayName: "Let's Connect",
  //   subText: "on LinkedIn",
  //   icon: Linkedin,
  //   url: "https://www.linkedin.com/in/kyywxv/",
  //   color: "#0A66C2",
  //   gradient: "from-[#0A66C2] to-[#0077B5]",
  //   isPrimary: true,
  // },
  {
    name: "Instagram 1",
    displayName: "Instagram",
    subText: "@kyywxv",
    icon: Instagram,
    url: "https://www.instagram.com/kyywxv/?hl=id",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
  {
    name: "Instagram 2",
    displayName: "Instagram 2",
    subText: "@1kyuuu_", 
    icon: Instagram,
    url: "https://www.instagram.com/1kyuuu_/", 
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]",
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@kyywxv",
    icon: Github,
    url: "https://github.com/kyywxv",
    color: "#ffffff",
    gradient: "from-[#333] to-[#24292e]",
  },
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find((link) => link.isPrimary);
  const otherLinks = socialLinks.filter((link) => !link.isPrimary);

  useEffect(() => {
    AOS.init({
      offset: 10,
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 sm:p-5 backdrop-blur-xl border border-white/10">
      {/* Ukuran Judul Dikecilkan */}
      <h3
        className="text-base font-semibold text-white mb-4 flex items-center gap-2"
        data-aos="fade-down"
      >
        <span className="inline-block w-6 h-0.5 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-3">
        {/* Render LinkedIn (Primary) - Ukuran Lebih Compact */}
        {linkedIn && (
          <a
            href={linkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-gradient-to-r ${linkedIn.gradient}`} />
            <div className="relative flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-15 rounded-md transition-all duration-500 group-hover:scale-110 group-hover:opacity-25" style={{ backgroundColor: linkedIn.color }} />
                <div className="relative p-1.5 rounded-md">
                  <linkedIn.icon className="w-5 h-5 transition-all duration-500 group-hover:scale-105" style={{ color: linkedIn.color }} />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-200 tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                  {linkedIn.displayName}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5 group-hover:text-gray-300 transition-colors duration-300">
                  {linkedIn.subText}
                </span>
              </div>
            </div>
            <ExternalLink className="relative w-4 h-4 text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
          </a>
        )}

        {/* Render Sosmed Lainnya dalam Grid Lebih Padat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {otherLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={200 + index * 100}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`} />
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-15 rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:opacity-25" style={{ backgroundColor: link.color }} />
                <div className="relative p-1.5 rounded-lg">
                  <link.icon className="w-4 h-4 transition-all duration-500 group-hover:scale-110" style={{ color: link.color }} />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-gray-200 group-hover:text-white transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-[10px] text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;