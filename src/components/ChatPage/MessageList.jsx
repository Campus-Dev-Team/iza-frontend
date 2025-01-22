import React, { useEffect, useRef, useState } from "react";
import { useChat } from '../../context/ChatContext';
import { AgeAvailabilityForm } from '../MessageTypes/AgeAvailabilityForm';
import { AvailabilityForm } from "../MessageTypes/AvailabilityForm";
import { DefaultMessage } from "../MessageTypes/DefaultMessage";
import ReactMarkdown from "react-markdown";


export const MessageList = () => {
  const { messages } = useChat();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const renderAvatar = (isAI) => {
    if (isAI) {
      return (
        <img
          src="src/assets/iza-campus.webp"
          alt="Iza Campus"
          className="w-full h-full object-cover"
        />
      );
    }

    // Avatar para el usuario
    return (
      <div className="w-full h-full flex items-center justify-center bg-cyan-400/20 text-white font-medium">
        U
      </div>
    );
  };

  const scrollToBottom = () => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Se ejecuta cada vez que hay nuevos mensajes


  const renderMessage = (msg) => {
    switch (msg.type) {
      case "age-form":
        return <AgeAvailabilityForm message={msg} />;
      case "availability-form":
        return <AvailabilityForm message={msg} />;
      default:
        return (
          <div
            className={`p-3 rounded-lg ${
              msg.isAI ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
            }`}
          >
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline hover:text-cyan-300"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {msg.message}
            </ReactMarkdown>
          </div>
        );
    }
  };
  
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto scrollbar-custom relative"
    >
      <div className="absolute inset-0 py-4 px-4">
        <div className="max-w-[95%] mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={msg.id}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
              className={`w-full flex ${!msg.isAI ? 'justify-end' : 'justify-start'
                } animate-slide-in opacity-0`}
            >
              <div className={`flex items-start gap-2 max-w-[55%] ${msg.isAI ? 'flex-row' : 'flex-row-reverse'
                }`}>
                {/* Avatar */}
                <div className={`h-8 w-8 ring-2 rounded-full flex items-center 
                              justify-center overflow-hidden shrink-0 ${msg.isAI
                    ? 'ring-cyan-400/20 bg-slate-800'
                    : 'ring-cyan-400/30 bg-slate-800/50'
                  }`}>
                  {renderAvatar(msg.isAI)}
                </div>

                {/* Mensaje */}
                <div className={`${msg.type === 'age-form' || msg.type === 'availability-form'
                  ? 'w-full' : ''
                  }`}>
                  {renderMessage(msg)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>
    </div>
  );

};