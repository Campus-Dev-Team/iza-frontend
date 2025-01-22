import React, { useState } from "react";
import { Rocket, Code, Facebook, Instagram, LogOut, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const ChatNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Botón hamburguesa - Solo visible en móvil */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/80 rounded-lg text-white hover:bg-slate-700/80 transition-all duration-200"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Navbar */}
      <div
        className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-40
                   w-[280px] lg:w-80 bg-slate-800/50 backdrop-blur-xl
                   border-r border-cyan-400/10 flex flex-col
                   transform transition-transform duration-300 ease-in-out
                   ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Contenido del navbar */}
        <div className="p-8 flex flex-col items-center space-y-6 mt-12 lg:mt-0">
          <div className="relative">
            <div className="h-20 w-20 lg:h-28 lg:w-28 ring-2 ring-cyan-400/20 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src="src/assets/iza-campus.webp"
                alt="Iza Campus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-cyan-400 rounded-full ring-2 ring-slate-900" />
          </div>

          <div className="text-center">
            <h2 className="text-xl lg:text-2xl font-bold text-cyan-400">IZA</h2>
            <p className="text-indigo-400 text-sm">Campus Support Team</p>
          </div>

          <div className="w-full space-y-2">
            <h3 className="text-lg font-medium text-white/90">Description</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Asistente virtual enfocada en guiar tu experiencia en Campuslands"
            </p>
          </div>
        </div>

        <div className="px-6 flex-1 space-y-3">
          {[
            { icon: Rocket, text: 'Campers Storys' },
            { icon: Code, text: 'Campuslands' },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center px-4 py-2 text-white/70 hover:text-cyan-400 hover:bg-cyan-400/5 rounded-lg group transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {item.text}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-cyan-400/10 flex flex-col space-y-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-white/70 
                     hover:text-red-400 hover:bg-red-400/5 rounded-lg group transition-all duration-300"
          >
            <LogOut className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Cerrar Sesión
          </button>
          
          <div className="flex justify-center space-x-6">
            {[Facebook, Instagram].map((Icon, index) => (
              <button
                key={index}
                className="text-white/60 hover:text-cyan-400 transition-colors duration-300"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay para cerrar el menú en móvil */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};