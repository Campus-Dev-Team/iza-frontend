import React from "react";
import { Rocket, Code, Facebook, Instagram, Linkedin, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LazyImage } from "../common/LazyImage";

// Componente personalizado para TikTok
const TikTokIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Mapeo de redes sociales por ciudad
const socialMediaByCity = {
  Bucaramanga: [
    { Icon: Facebook, url: "https://www.facebook.com/Campuslands" },
    { Icon: Instagram, url: "https://www.instagram.com/campuslands/" },
    { Icon: TikTokIcon, url: "https://www.tiktok.com/campuslands" },
    { Icon: Linkedin, url: "https://www.linkedin.com/company/campuslands/" }
    
  ],
  Bogotá: [
    { Icon: Facebook, url: "https://www.facebook.com/Campuslands" },
    { Icon: Linkedin, url: "https://www.linkedin.com/company/campuslands/" },
    { Icon: Instagram, url: "https://www.instagram.com/eancampuslands/" },
    { Icon: TikTokIcon, url: "https://www.tiktok.com/campuslands" },
  ],
};

export const ChatNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Obtener ciudad desde localStorage y determinar redes sociales
  const city = localStorage.getItem("city");
  const socialMedia = socialMediaByCity[city] || [];

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="w-80 bg-slate-800/50 backdrop-blur-xl border-cyan-400/10 flex flex-col">
      {/* Información del usuario */}
      <div className="p-8 flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="h-28 w-28 ring-2 ring-cyan-400/20 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
            <LazyImage
              src="https://camper-stories.s3.us-east-2.amazonaws.com/assets/iza-campus.webp"
              alt="Iza Campus"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-cyan-400 rounded-full ring-2 ring-slate-900" />
        </div>

          <div className={`text-center ${isCollapsed ? "lg:hidden" : ""}`}>
            <h2 className="text-xl lg:text-2xl font-bold text-cyan-400">IZA</h2>
            <p className="text-indigo-400 text-sm">Campus Support Team</p>
          </div>

        <div className="w-full space-y-2">
          <h3 className="text-lg font-medium text-white/90">Description</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Asistente virtual enfocada en guiar tu experiencia en Campuslands
          </p>
        </div>
      </div>

      {/* Menú */}
      <div className="px-6 flex-1 space-y-3">
        {[
          { icon: Rocket, text: "Campers Storys" },
          { icon: Code, text: "Campuslands" },
        ].map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center px-4 py-2 text-white/70 hover:text-cyan-400 hover:bg-cyan-400/5 rounded-lg group transition-all duration-300"
          >
            <item.icon className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
            {item.text}
          </button>
        ))}
      </div>

      {/* Redes sociales */}
      <div className="p-6 border-t border-cyan-400/10 flex flex-col space-y-6">
        <div className="flex justify-center space-x-6">
          {socialMedia.map(({ Icon, url }, index) => (
            <a
              href={url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors duration-300"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Botón de Cerrar Sesión */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-2 text-white/70 hover:text-red-400 hover:bg-red-400/5 rounded-lg group transition-all duration-300"
        >
          <LogOut className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
