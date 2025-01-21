import React from "react";

export const ChatHeader = () => {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl px-8 pt-2 pb-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="https://camper-stories.s3.us-east-2.amazonaws.com/CampusLogo.png"
          alt="Campus Logo"
          className="object-contain h-full w-60"
        />
      </div>
      <a
        href="https://miniurl.cl/RegistroCampuslands"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-cyan-400 mr-4 hover:bg-cyan-400/90 text-slate-900 px-6 py-2 rounded-lg font-medium
          relative before:absolute before:inset-0 before:-z-10 before:blur-lg before:rounded-lg
          before:bg-gradient-to-r before:from-cyan-300 before:via-cyan-400 before:to-cyan-500
          before:transition-all before:duration-300 before:hover:blur-xl"
      >
        Inscríbete ahora
      </a>
    </div>
  );
};
