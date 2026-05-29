import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Mengirim Pesan...',
      html: 'Harap tunggu selagi kami mengirim pesan Anda',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const formSubmitUrl = 'https://formsubmit.co/ikyuxii@gmail.com';

      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'Pesan Baru dari Website Portfolio 2.0');
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');

      await axios.post(formSubmitUrl, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        title: 'Berhasil!',
        text: 'Pesan Anda telah berhasil terkirim!',
        icon: 'success',
        confirmButtonColor: '#4b5563',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });

    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan Anda telah berhasil terkirim!',
          icon: 'success',
          confirmButtonColor: '#4b5563',
          timer: 2000,
          timerProgressBar: true
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
          icon: 'error',
          confirmButtonColor: '#6366f1'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%]" >
      {/* Header Section Dikecilkan */}
      <div className="text-center lg:mt-[4%] mt-8 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-2xl md:text-3xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"
        >
          <span
            style={{
              color: "#ffffff",
              backgroundImage: "linear-gradient(45deg, #ffffff 10%, #64748b 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hubungi Saya
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-xl mx-auto text-xs md:text-sm mt-1.5 font-light"
        >
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      <div
        className="h-auto py-6 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[38%_62%] gap-8" >
          
          {/* Kolom Kiri: Form Box */}
          <div className="bg-[#0f0f0f] backdrop-blur-xl rounded-2xl shadow-2xl p-4 py-6 sm:p-6 sm:py-8 transform transition-all duration-500 border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  Hubungi
                </h2>
                <p className="text-xs text-gray-400 font-light">
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.
                </p>
              </div>
              <Share2 className="w-6 h-6 text-gray-400 opacity-40" />
            </div>

            <form 
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Input Nama */}
              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 rounded-xl bg-[#030303] border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all duration-300 hover:border-white/20 disabled:opacity-50"
                  required
                />
              </div>

              {/* Input Email */}
              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-3 pl-10 bg-white/5 rounded-xl border border-white/10 placeholder-gray-500 text-white text-xs focus:outline-none focus:ring-1 focus:ring-white/40 transition-all duration-300 hover:border-white/20 disabled:opacity-50"
                  required
                />
              </div>

              {/* Input Pesan / Textarea */}
              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-3 pl-10 bg-white/5 rounded-xl border border-white/10 placeholder-gray-500 text-white text-xs focus:outline-none focus:ring-1 focus:ring-white/40 transition-all duration-300 hover:border-white/20 h-[8rem] disabled:opacity-50"
                  required
                />
              </div>

              {/* Tombol Kirim */}
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-3 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-[1.01] hover:shadow-md hover:shadow-white/10 active:scale-[0.99] flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>

            {/* Social Links Box */}
            <div className="mt-6 pt-5 border-t border-white/5 flex justify-center">
              <SocialLinks />
            </div>
          </div>

          {/* Kolom Kanan: Komentar */}
          <div className="bg-[#0f0f0f] backdrop-blur-xl rounded-2xl p-3 py-4 md:p-6 shadow-2xl transform transition-all duration-500 border border-white/10">
            <Komentar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;