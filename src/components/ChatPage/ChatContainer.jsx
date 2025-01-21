import React, { useState, useEffect } from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { addMessage } from "@/services/messagesService";

export const ChatContainer = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      avatar: "B",
      message: "¡Bienvenido a Campuslands! ¿En qué podemos ayudarte?",
      isAI: true,
    },
  ]);
  const [socket, setSocket] = useState(null);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    // Inicializar WebSocket
    const ws = new WebSocket(
      "wss://chatcampuslands.com:8443/chatbot--TEST/chat"
    );

    ws.onopen = () => {
      console.log("Conexión WebSocket establecida");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      // Agregar mensaje del bot
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          avatar: "C",
          message: event.data,
          isAI: true,
        },
      ]);

      setMessageCount((prev) => {
        const newCount = prev + 1;
        if (newCount === 1) {
          // Mostrar formulario de edad y disponibilidad
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              avatar: "C",
              message:
                "🎉 ¿Qué edad tienes y tienes disponibilidad de 8 horas diarias?",
              isAI: true,
              type: "age-form",
            },
          ]);
        } else if (newCount === 8) {
          // Mostrar opciones de contacto
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              avatar: "C",
              message: "¿Cómo prefieres que te contactemos?",
              isAI: true,
              type: "contact-form",
            },
          ]);
        }
        return newCount;
      });
    };

    ws.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };

    ws.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    // Limpiar al desmontar
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleSendMessage = async (message) => {
    if (!message.trim() || !socket) return;

    const userName = localStorage.getItem("userName");
    const userCity = localStorage.getItem("userCity");

    // Agregar mensaje del usuario al chat
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        avatar: "U",
        message: message,
        isAI: false,
      },
    ]);

    const fullMessage = {
      type: "message",
      message: `Mi nombre es: ${userName} y mi pregunta es: ${message}`,
      city: userCity,
    };

    socket.send(JSON.stringify(fullMessage));
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
