import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { AgeAvailabilityForm } from "../MessageTypes/AgeAvailabilityForm";
import { AvailabilityForm } from "../MessageTypes/AvailabilityForm";
import { LazyImage } from "../common/LazyImage";
import ReactMarkdown from "react-markdown";
import { ShortQuestionsForm } from "../MessageTypes/ShortsQuestionsForm";
import { getMessagesByChatId } from "@/services/messagesService";
import { getChatId } from "@/services/chatService";

export const MessageList = ({ handleSendMessage }) => {
  const { messages } = useChat();
  const messagesEndRef = useRef(null);
  const [messagesPrev, setMessagesPrev] = useState([]);
  const [chatId, setChatId] = useState();
  const containerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!chatId) {
      const fetchChatId = async () => {
        try {
          const response = await getChatId();
          setChatId(response.data);
        } catch (error) {
          console.error("Error loading chat id:", error);
        }
      };
      fetchChatId();
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatId || messagesPrev.length > 0) return; 
    const loadMessages = async () => {
      try {
        const response = await getMessagesByChatId(chatId);
        setMessagesPrev(response.data);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
  
    loadMessages();
  }, [chatId, messagesPrev.length]); 
  

  const renderAvatar = (isAI) => {
    return isAI ? (
      <LazyImage
        src="https://camper-stories.s3.us-east-2.amazonaws.com/assets/iza-campus.webp"
        alt="Iza Campus"
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-cyan-400/20 text-white font-medium">
        🚀
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
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messagesPrev.length]);    

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = (msg) => {
    switch (msg.type) {
      case "age-form":
        return <AgeAvailabilityForm message={msg} />;
      case "availability-form":
        return <AvailabilityForm message={msg} />;
      case "short-questions":
        return <ShortQuestionsForm onSelectQuestion={handleSendMessage} />;
      default:
        return (
          <div
            className={`p-3 rounded-lg ${
              msg.messageType === "USER"
                ? "bg-slate-700/50 text-white"
                : "bg-cyan-400/10 text-white"
            }`}
          >
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                    {props.children}
                  </a>
                ),
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        );
    }
  };

  const renderMessageWebSocket = (msg) => {
    switch (msg.type) {
      case "age-form":
        return <AgeAvailabilityForm message={msg} />;
      case "availability-form":
        return <AvailabilityForm message={msg} />;
      case "short-questions":
        return <ShortQuestionsForm onSelectQuestion={handleSendMessage} />;
      default:
        return (
          <div
            className={`p-3 rounded-lg ${
              msg.isAI
                ? "bg-slate-700/50 text-white"
                : "bg-cyan-400/10 text-white"
            }`}
          >
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                    {props.children}
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
      className="flex-1 overflow-y-auto scrollbar-custom relative bg-[#0F172A] mb-4"
    >
      <div className="absolute inset-0 py-6 px-4">
        <div className="max-w-[100%] mx-auto space-y-6">
          {messagesPrev
            .slice()
            .reverse()
            .map((msg, index) => (
              <div
                key={msg.id}
                style={{ animationDelay: `${index * 0.1}s` }}
                className={`w-full flex ${
                  msg.messageType === "IA" ? "justify-start" : "justify-end"
                } 
                animate-slide-in opacity-100`}
              >
                <div
                  className={`flex items-start gap-3 ${
                    msg.messageType === "IA"
                      ? "flex-row max-w-[70%]"
                      : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`h-8 w-8 ring-2 rounded-full flex items-center justify-center overflow-hidden shrink-0 
                  ${
                    msg.messageType === "IA"
                      ? "ring-cyan-400/20 bg-slate-800"
                      : "ring-cyan-400/30 bg-slate-800/50"
                  }`}
                  >
                    {renderAvatar(msg.messageType === "IA")}
                  </div>
                  <div className={`flex-1 ${msg.type ? "w-full" : ""}`}>
                    {renderMessage(msg)}
                  </div>
                </div>
              </div>
            ))}

          {messages.map((msg, index) => (
            <div
              key={msg.id}
              style={{
                animationDelay: `${(index + messagesPrev.length) * 0.1}s`,
              }}
              className={`w-full flex ${
                !msg.isAI ? "justify-end" : "justify-start"
              } animate-slide-in opacity-100`}
            >
              <div
                className={`flex items-start gap-3 ${
                  msg.isAI ? "flex-row max-w-[80%]" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`h-8 w-8 ring-2 rounded-full flex items-center justify-center overflow-hidden shrink-0
                  ${
                    msg.isAI
                      ? "ring-cyan-400/20 bg-slate-800"
                      : "ring-cyan-400/30 bg-slate-800/50"
                  }`}
                >
                  {renderAvatar(msg.isAI)}
                </div>
                <div className={`flex-1 ${msg.type ? "w-full" : ""}`}>
                  {renderMessageWebSocket(msg)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};
