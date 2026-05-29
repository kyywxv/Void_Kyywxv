import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-6 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f8fafc] to-[#64748b]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-1 text-gray-400 max-w-xl mx-auto text-xs sm:text-sm flex items-center justify-center gap-1.5"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-4 h-4 text-gray-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-4 h-4 text-gray-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center sm:p-6 sm:py-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Optimized gradient backgrounds */}
      <div className="absolute -inset-4 opacity-[20%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 rounded-full blur-xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-gray-500 via-gray-400 to-gray-300 rounded-full blur-xl animate-pulse-slow opacity-50" />
      </div>

      <div className="relative">
        {/* Ukuran Foto Dikecilkan agar Lebih Pas */}
        <div className="w-60 h-60 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-2 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          
          <img
            src="/FotoWeb.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1100} className="relative group">
    <div className="relative z-10 bg-[#0f0f0f] backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-6 h-6 text-gray-200" />
        </div>
        <span 
          className="text-2xl sm:text-3xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1200"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-wider text-gray-300 mb-1">
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-gray-400 font-light">
            {description}
          </p>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    
    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: false });
    };
    initAOS();
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-white/10 to-white/5",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-white/10 to-white/5",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-white/10 to-white/5",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="h-auto pb-[6%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-8 sm:mt-0" 
      id="About"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Header />

      <div className="w-full mx-auto pt-4 sm:pt-6 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Kolom Teks Informasi */}
          <div className="space-y-4 text-center lg:text-left">
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f8fafc] to-[#64748b]">
                Hello, I'm
              </span>
              <span 
                className="block mt-1 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
                itemProp="name"
              >
                Muhammad Rizki
              </span>
            </h2>
            
            <p 
              className="text-xs sm:text-sm text-gray-400 leading-relaxed text-justify pb-2 sm:pb-0 font-light"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Saya adalah Mahasiswa Aktif di Jurusan Teknik Informatika. 
              Seperti yang kalian tahu, sebelumnya saya sudah memiliki Website Portofolio. Pada website kali ini saya hanya iseng menambahkan foto-foto yang saya sukai untuk ditampilkan, dan di sini saya ingin menambahkan beberapa fitur yang tidak masuk di web utama. hehe
            </p>

            {/* Quote Section Ringkas */}
            <div 
              className="relative bg-[#0f0f0f] border border-white/10 rounded-xl p-3 my-4 backdrop-blur-md shadow-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <div className="absolute top-2 right-4 w-12 h-12 bg-gradient-to-r from-white/5 to-white/5 rounded-full blur-lg"></div>
              
              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-xs relative z-10 sm:pl-4">
                "Leveraging AI as a professional tool, not a replacement."
              </blockquote>
            </div>

            {/* Tombol Aksi Ukuran Kompak */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 w-full">
              <a href="/CV.pdf" download="CV_Muhammad Rizki.pdf" className="w-full sm:w-auto">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-white to-gray-400 text-black text-xs font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1.5 shadow-md"
                >
                  <FileText className="w-4 h-4" /> Download CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full sm:w-auto">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-white/20 text-white text-xs font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1.5 hover:bg-white/5"
                >
                  <Code className="w-4 h-4" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);