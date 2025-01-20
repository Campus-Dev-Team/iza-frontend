import React from "react";


export const MessageList = () => {
    const messages = [
      {
        id: 1,
        avatar: 'B',
        message: '¡Bienvenido a Campuslands! ¿En qué podemos ayudarte?',
        isAI: true
      }
      // Aquí puedes agregar más mensajes
    ];
  
    return (
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className="h-8 w-8 ring-1 ring-cyan-400/20 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-sm text-cyan-400">{msg.avatar}</span>
              </div>
              <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 border border-cyan-400/10">
                <p className="text-white/90">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };