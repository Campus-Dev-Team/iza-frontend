import React from 'react';
import { useChat } from '@/context/ChatContext';

export const AvailabilityForm = ({ message }) => {
  const { submitAvailability } = useChat();

  return (
    <div className="bg-slate-800/50 rounded-2xl p-4">
      <p className="text-white/90 mb-4">{message.message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => submitAvailability(true)}
          className="flex-1 bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg
                     hover:bg-cyan-400/90 transition-colors"
        >
          Sí, tengo disponibilidad
        </button>
        <button
          onClick={() => submitAvailability(false)}
          className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg
                     hover:bg-slate-500 transition-colors"
        >
          No tengo disponibilidad
        </button>
      </div>
    </div>
  );
};