import React, { useState } from "react";
import { SendHorizonal } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { addMessage } from "@/services/messagesService";

export const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");
  const { isInputEnabled } = useChat();

  const handleAddMessage = async () => {
    try {
      const response = await addMessage(message);
      console.log('respuesta al anadir mensaje',response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && isInputEnabled) {
      onSendMessage(message);
      setMessage("");
      handleAddMessage(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 bg-slate-800/30 backdrop-blur-xl">
      <div className="max-w-2xl mx-auto flex space-x-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            !isInputEnabled
              ? "Por favor, responde las preguntas anteriores..."
              : "Escribe tú mensaje ..."
          }
          className="flex-1 bg-slate-800/50 border border-cyan-400/10 rounded-lg 
                     px-4 py-[9px] text-white placeholder:text-white/40 
                     focus:ring-2 focus:ring-cyan-400/30 
                     focus:border-cyan-400/30 outline-none"
          disabled={disabled || !isInputEnabled}
        />
        <button
          type="submit"
          className={`bg-cyan-400 text-slate-900 p-2 px-[12px] rounded-3xl 
                     ${(disabled || !isInputEnabled)
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-cyan-400/90'}`}
          disabled={disabled || !isInputEnabled}
        >
          <SendHorizonal className="h-[20px] w-[20px]" />
        </button>
      </div>
    </form>
  );
};
