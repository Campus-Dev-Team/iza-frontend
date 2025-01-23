import React, { useState } from "react";
import { Rocket, Code, Facebook, Instagram, LogOut, Linkedin, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LazyImage } from '../common/LazyImage';

export const ChatNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Botón hamburguesa - Solo visible en móvil */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-1/2 -translate-y-1/2 left-0 z-50 
             flex items-center justify-center
             w-6 h-12 bg-slate-800 hover:bg-slate-700
             text-white rounded-r-lg transition-all duration-200
             border-r border-t border-b border-cyan-400/10"
      >
        {isMenuOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      {/* Botón de colapso - Solo visible en desktop */}
      <button
        onClick={toggleCollapse}
        className="hidden lg:flex fixed top-1/2 -translate-y-1/2 z-50 
           items-center justify-center w-8 h-8
           bg-slate-800 hover:bg-slate-700/90
           text-white rounded-full transition-all duration-200
           border border-cyan-400/10 shadow-sm"
        style={{
          left: isCollapsed ? "44px" : "284px",
          transition: "all 300ms ease-in-out",
        }}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Navbar */}
      <div
        className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-40
                   w-[280px] lg:w-80 bg-slate-800/50 backdrop-blur-xl
                   border-r border-cyan-400/10 flex flex-col
                   transform transition-all duration-300 ease-in-out
                   ${isMenuOpen ? "translate-x-0" : "-translate-x-[calc(100%-6px)]"}
                   ${isCollapsed ? "lg:w-[64px]" : ""}`}
      >
        {/* Contenido del navbar */}
        <div
          className={`p-8 flex flex-col items-center space-y-6 mt-12 lg:mt-0 
                      ${isCollapsed ? "lg:p-4" : ""}`}
        >
          <div className="relative">
            <div
              className={`ring-2 ring-cyan-400/20 rounded-full bg-slate-800 
                         flex items-center justify-center overflow-hidden
                         ${isCollapsed ? "h-12 w-12" : "h-20 w-20 lg:h-28 lg:w-28"}`}
            >
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

          <div className={`w-full space-y-2 ${isCollapsed ? "lg:hidden" : ""}`}>
            <h3 className="text-lg font-medium text-white/90">Description</h3>
            <p className="text-sm text-white/60 leading-relaxed">
            Soy Iza, tu asistente en Campuslands. Estoy aquí para ayudarte a alcanzar tus sueños en tecnología con nuestro programa intensivo, que ofrece formación innovadora y oportunidades laborales 😊.
            </p>
          </div>
        </div>

        <div className="px-6 flex-1 space-y-3">
          {[
            { icon: Rocket, text: "Campers Storys" },
            { icon: Code, text: "Campuslands" },
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center px-4 py-2 text-white/70 
                      hover:text-cyan-400 hover:bg-cyan-400/5 rounded-lg 
                      group transition-all duration-300
                      ${isCollapsed ? "lg:justify-center" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon
                className={`h-5 w-5 group-hover:rotate-12 transition-transform
                                 ${isCollapsed ? "" : "mr-3"}`}
              />
              <span className={isCollapsed ? "lg:hidden" : ""}>{item.text}</span>
            </button>
          ))}
        </div>

        <div
          className={`p-6 border-t border-cyan-400/10 flex flex-col space-y-6
                      ${isCollapsed ? "lg:p-4" : ""}`}
        >
          <button
            onClick={handleLogout}
            className={`w-full flex items-center px-4 py-2 text-white/70 
                     hover:text-red-400 hover:bg-red-400/5 rounded-lg 
                     group transition-all duration-300
                     ${isCollapsed ? "lg:justify-center" : "justify-center"}`}
          >
            <LogOut
              className={`h-5 w-5 group-hover:rotate-12 transition-transform
                            ${isCollapsed ? "" : "mr-3"}`}
            />
            <span className={isCollapsed ? "lg:hidden" : ""}>Cerrar Sesión</span>
          </button>

          <div
            className={`flex justify-center space-x-6 
                        ${isCollapsed ? "lg:flex-col lg:space-x-0 lg:space-y-4" : ""}`}
          >
            {[
              { Icon: Facebook, url: "https://www.facebook.com/Campuslands" },
              { Icon: Instagram, url: "https://www.instagram.com/campuslands/" },
              { Icon: Linkedin, url: "https://www.linkedin.com/company/campuslands/" },
            ].map(({ Icon, url }, index) => (
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
        </div>
      </div>

      {/* Overlay para cerrar el menú en móvil */}
      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMenuOpen(false)} />}
    </>
  )
};