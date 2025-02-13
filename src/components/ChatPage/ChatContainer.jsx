import React, { useEffect, useState } from "react";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { LoadingMessage } from "./LoadingMessage";
import { wsService } from "../../services/wssChatService";
import { useChat } from "../../context/ChatContext";
import { getChatId } from "@/services/chatService";

export const ChatContainer = () => {
  const { messages, setMessages, isInputEnabled } = useChat();
  const [isConnected, setIsConnected] = useState(false);
  const [chatId, setChatId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChatId = async () => {
      try {
        const response = await getChatId();
        setChatId(response.data);
      } catch (error) {
        console.error("Error loading chat id:", error);
      }
    };

    fetchChatId();
  }, []);

  const handleSendMessage = async (message) => {
    if (!message.trim() || !isConnected || !isInputEnabled) return;

    const userName = localStorage.getItem("userName");
    const userCity = localStorage.getItem("city");

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

    setIsLoading(true);

    try {
      const fullMessage = {
        type: "message",
        message: `Mi nombre es: ${userName}, (NO me saludes, solo usa mi nombre)soy de la ciudad: ${userCity} y mi pregunta es: ${message}`,
        city: userCity,
        from: "WEB",
        chatId: chatId,
      };

      console.log("Chat id: ", chatId);

      await wsService.sendMessage(fullMessage);
      return true;
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          avatar: "C",
          message:
            "Lo siento, hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.",
          isAI: true,
          isError: true,
        },
      ]);
    }
  };

  useEffect(() => {
    const socket = wsService.connect();

    socket.onopen = () => {
      setIsConnected(true);
      console.log("Conexión WebSocket establecida");
    };

    const handleMessage = (data) => {
      try {
        const messageContent = typeof data === "string" ? data : data.message;

        setTimeout(() => {
          setIsLoading(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              avatar: "C",
              message: messageContent,
              isAI: true,
            },
          ]);
        }, 1500); // 1.5 segundos de delay
      } catch (error) {
        console.error("Error al procesar mensaje:", error);
        setIsLoading(false);
      }
    };

    wsService.addMessageHandler(handleMessage);

    return () => {
      wsService.removeMessageHandler(handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-4rem)]">
      <MessageList handleSendMessage={handleSendMessage} />
      {isLoading && <LoadingMessage />}
      <ChatInput onSendMessage={handleSendMessage} disabled={!isConnected} />
    </div>
  );
};
