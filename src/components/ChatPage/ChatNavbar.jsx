import React from "react";
import {Rocket, Code, Trophy, Settings2, Phone } from 'lucide-react';

export const ChatNavbar = () => {
    return (
      <div className="w-80 bg-slate-800/50 backdrop-blur-xl border-r border-cyan-400/10 flex flex-col">
        <div className="p-8 flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="h-28 w-28 ring-2 ring-cyan-400/20 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-2xl text-cyan-400">IZA</span>
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-cyan-400 rounded-full ring-2 ring-slate-900" />
          </div>
  
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cyan-400">IZA</h2>
            <p className="text-indigo-400 text-sm">Campus Support Team</p>
          </div>
  
          <div className="w-full space-y-2">
            <h3 className="text-lg font-medium text-white/90">Description</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Desarrollador apasionado por la tecnología y la educación.
            </p>
          </div>
        </div>
  
        <div className="px-6 flex-1 space-y-3">
          {[
            { icon: Rocket, text: 'Campers Storys' },
            { icon: Code, text: 'Campuslands' },
            { icon: Trophy, text: 'Recursos' },
            { icon: Settings2, text: 'Configuración' }
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
  
        <div className="p-6 border-t border-cyan-400/10">
          <div className="flex justify-center space-x-6">
            {[Phone, Phone, Phone].map((Icon, index) => (
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
    );
  };