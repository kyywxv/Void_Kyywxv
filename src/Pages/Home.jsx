import React, { useState, useEffect, useCallback, memo } from "react"
import { Helmet } from "react-helmet-async"
import { Github, Mail, ExternalLink, Instagram, Sparkles, Globe } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-gray-300 to-gray-500 text-transparent bg-clip-text sm:text-xs text-[0.65rem] font-medium flex items-center">
          <Sparkles className="sm:w-3.5 sm:h-3.5 w-3 h-3 mr-1.5 text-white/80" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-1" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#000000] to-[#0a0a0a] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Web
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-1">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#000000] to-[#0a0a0a] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-3 py-1 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, isExternal }) => (
  <a href={href} target={isExternal ? "_blank" : "_self"} rel={isExternal ? "noopener noreferrer" : ""}>
    <button className="group relative w-[140px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-10 bg-[#030303] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#1a1a1a]/20 to-[#0a0a0a]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-xs group-hover:gap-2.5 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-3.5 h-3.5 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-0.5' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative p-2" aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#000000] to-[#1a1a1a] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Informatics Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/kyywxv", label: "GitHub Profile" },
  { icon: Instagram, link: "https://www.instagram.com/kyywxv/?hl=id", label: "Instagram Profile" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const initAOS = () => {
      AOS.init({ once: true, offset: 10 });
    };
    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Helmet>
        <title>Kyywxv_</title>
        <meta name="description" content="Informatics Engineering Student & Web Developer." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://kyywxv.vercel.app" />
        <meta property="og:title" content="Kyywxv - Web Developer" />
        <meta property="og:description" content="Portfolio Muhammad Rizki, showcasing web development and IoT projects." />
        <meta property="og:url" content="https://kyywxv.vercel.app" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-[#030303] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="Home">
        <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="container mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-8 lg:gap-16">
              
              {/* Kolon Kiri: Informasi Teks */}
              <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 text-left lg:text-left order-1 lg:order-1"
                data-aos="fade-right"
                data-aos-delay="200">
                <div className="space-y-3 sm:space-y-4">
                  <StatusBadge />
                  <MainTitle />

                  <div className="h-6 flex items-center" data-aos="fade-up" data-aos-delay="800">
                    <span className="text-lg md:text-xl bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent font-light">
                      {text}
                    </span>
                    <span className="w-[2px] h-5 bg-gradient-to-t from-gray-400 to-gray-200 ml-1 animate-blink"></span>
                  </div>

                  <p className="text-sm md:text-base text-gray-400 max-w-lg leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000">
                    Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
                  </p>

                  <div className="flex flex-wrap gap-2 justify-start" data-aos="fade-up" data-aos-delay="1200">
                    {TECH_STACK.map((tech, index) => (
                      <TechStack key={index} tech={tech} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 w-full justify-start pt-2" data-aos="fade-up" data-aos-delay="1400">
                    <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                    <CTAButton href="#Contact" text="Contact" icon={Mail} />
                    <CTAButton href="https://kyywxv.vercel.app" text="Portfolio" icon={Globe} isExternal={true} />
                  </div>

                  <div className="hidden sm:flex gap-3 justify-start pt-1" data-aos="fade-up" data-aos-delay="1600">
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Kolon Kanan: Animasi Lottie Coding */}
              <div className="w-full lg:w-1/2 h-auto ml-0 lg:ml-10 flex items-center justify-center order-2 lg:order-2 mt-10 lg:mt-0"
                data-aos="fade-left"
                data-aos-delay="600">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-gray-500/10 blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative z-10 w-full max-w-[400px] sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[850px]">
                    <DotLottieReact
                      src="/NewCoding.json"
                      loop
                      autoplay
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);