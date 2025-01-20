import React from "react";

export const MessageList = ({ messages }) => {
  const renderMessage = (msg) => {
    if (msg.type === 'age-form') {
      return (
        <div className="bg-slate-700 rounded-2xl p-4 border border-cyan-400/10">
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Tu edad"
              className="bg-slate-800/50 border border-cyan-400/10 rounded-lg px-4 py-2 text-white"
            />
            <div className="flex space-x-4">
              <button className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg">
                Sí, tengo disponibilidad
              </button>
              <button className="bg-slate-600 text-white px-4 py-2 rounded-lg">
                No tengo disponibilidad
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (msg.type === 'contact-form') {
      return (
        <div className="bg-slate-700 rounded-2xl p-4 border border-cyan-400/10">
          <div className="flex space-x-4">
            <button className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg">
              Mensaje
            </button>
            <button className="bg-slate-600 text-white px-4 py-2 rounded-lg">
              Llamada
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-slate-800 rounded-2xl rounded-tl-none p-4 border border-cyan-400/10">
        <p className="text-white/90">{msg.message}</p>
      </div>
    );
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-2xl mx-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              !msg.isAI ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className="h-8 w-8 ring-1 ring-cyan-400/20 rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-sm text-cyan-400">{msg.avatar}</span>
            </div>
            {renderMessage(msg)}
          </div>
        ))}
      </div>
    </div>
  );
};