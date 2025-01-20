import React from "react";

export const ChatHeader = () => {
    return (
      <div className="bg-slate-800/30 backdrop-blur-xl border-b border-cyan-400/10 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-white/10 rounded-lg"></div>
          <div>
            <h1 className="text-xl font-bold text-cyan-400">CAMPUSLANDS</h1>
            <p className="text-sm text-indigo-400">Centro de formación tecnológica</p>
          </div>
        </div>
        <button className="bg-cyan-400 hover:bg-cyan-400/90 text-slate-900 px-6 py-2 rounded-lg font-medium">
          Inscríbete ahora
        </button>
      </div>
    );
  };