import React, { useState, useEffect } from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { addMessage } from "../../services/messagesService";
import { wsService } from "../../services/wssChatService";

export const ChatContainer = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      avatar: "B",
      message: "¡Bienvenido a Campuslands! ¿En qué podemos ayudarte?",
      isAI: true,
    },
  ]);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    // Función manejadora de mensajes
    const handleMessage = (data) => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        avatar: 'C',
        message: data,
        isAI: true
      }]);

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

    // Conectar WebSocket y agregar manejador
    wsService.connect();
    wsService.addMessageHandler(handleMessage);

    // Limpiar al desmontar
    return () => {
      wsService.removeMessageHandler(handleMessage);
      wsService.disconnect();
    };
  }, []);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userName = localStorage.getItem('userName');
    const userCity = localStorage.getItem('userCity');

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

    // Enviar mensaje a través del servicio
    const fullMessage = {
      type: "message",
      message: `Mi nombre es: ${userName} y mi pregunta es: ${message}`,
      city: userCity,
    };

    wsService.sendMessage(fullMessage);
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};
