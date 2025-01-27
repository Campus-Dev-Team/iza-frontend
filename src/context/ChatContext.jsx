// context/ChatContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { DEFAULT_MESSAGES } from '../constants/chatMessages';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([DEFAULT_MESSAGES.WELCOME, DEFAULT_MESSAGES.AGE_FORM]);
  const [userInfo, setUserInfo] = useState({
    age: null,
    hasAvailability: null
  });
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [isSending, setIsSending] = useState(false); // Agregamos el estado isSending
  const [answeredQuestions, setAnsweredQuestions] = useState({
    age: false,
    availability: false
  });

  const submitAge = (age) => {
    if (answeredQuestions.age) return; // Prevenir múltiples envíos

    setUserInfo(prev => ({ ...prev, age }));
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        avatar: 'U',
        message: `Tengo ${age} años`,
        isAI: false
      },
      DEFAULT_MESSAGES.AVAILABILITY_FORM
    ]);
    setAnsweredQuestions(prev => ({ ...prev, age: true }));
  };

  const submitAvailability = (hasAvailability) => {
    if (answeredQuestions.availability) return; // Prevenir múltiples envíos

    const currentTime = Date.now()
    setUserInfo(prev => ({ ...prev, hasAvailability }));
    setMessages(prev => [
      ...prev,
      {
        id: currentTime,
        avatar: 'U',
        message: hasAvailability ? 'Sí, tengo disponibilidad' : 'No tengo disponibilidad',
        isAI: false
      },
      {
        ...DEFAULT_MESSAGES.QUESTIONS_FORM,
        id: currentTime + 1 // Aseguramos ID único
      }

      // {
      //   ...DEFAULT_MESSAGES.NEXT_STEPS,
      //   id: Date.now() + 1
      // }
    ]);
    setAnsweredQuestions(prev => ({ ...prev, availability: true }));
    setIsInputEnabled(true);
  };

  return (
    <ChatContext.Provider value={{
      messages,
      setMessages,
      userInfo,
      isInputEnabled,
      submitAge,
      isSending,
      setIsSending, // Exportamos el setter
      submitAvailability,
      answeredQuestions
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);