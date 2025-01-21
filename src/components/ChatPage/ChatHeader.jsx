import React from "react";

export const ChatHeader = () => {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl  px-8 pt-2 pb-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="https://camper-stories.s3.us-east-2.amazonaws.com/CampusLogo.png"
          alt="Campus Logo"
          className="object-contain h-full w-60"
        />
      </div>
      <button className="bg-cyan-400 hover:bg-cyan-400/90 text-slate-900 px-6 py-2 rounded-lg font-medium">
        Inscríbete ahora
      </button>
    </div>
  );
};
