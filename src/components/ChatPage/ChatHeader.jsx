import React from "react";

export const ChatHeader = () => {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl px-2 lg:px-8 pt-2 pb-4 
                    flex justify-between items-center relative">
      {/* Logo Container */}
      <div className="flex space-x-3 ml-12 lg:ml-0"> {/* ml-12 para dejar espacio al botón de menú en móvil */}
        <img
          src="https://camper-stories.s3.us-east-2.amazonaws.com/CampusLogo.png"
          alt="Campus Logo"
          className="object-contain h-11 lg:h-12 w-40 lg:w-60"
        />
      </div>

      <a
        href="https://miniurl.cl/RegistroCampuslands"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-cyan-400 mr-2 lg:mr-4 
                 hover:bg-cyan-400/90 text-slate-900 
                 px-3 lg:px-6 py-1.5 lg:py-2 
                 text-sm lg:text-base
                 rounded-lg font-medium
                 whitespace-nowrap
                 relative before:absolute before:inset-0 
                 before:-z-10 before:blur-lg before:rounded-lg
                 before:bg-gradient-to-r before:from-cyan-300 
                 before:via-cyan-400 before:to-cyan-500
                 before:transition-all before:duration-300 
                 before:hover:blur-xl
                 transform hover:scale-105 transition-transform duration-200"
      >
        <span className="hidden lg:inline">Inscríbete ahora</span>
        <span className="lg:hidden">Inscríbete</span>
      </a>
    </div>
  );
};
