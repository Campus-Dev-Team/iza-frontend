import React from "react";
import { Send } from 'lucide-react';

export const ChatInput = () => {
  return (
    <div className="p-6 bg-slate-800/30 backdrop-blur-xl border-t border-cyan-400/10">
      <div className="max-w-2xl mx-auto flex space-x-4">
        <input
          placeholder="Escribe tú mensaje ..."
          className="flex-1 bg-slate-800/50 border border-cyan-400/10 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400/30 outline-none"
        />
        <button className="bg-cyan-400 hover:bg-cyan-400/90 text-slate-900 p-2 rounded-lg">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};