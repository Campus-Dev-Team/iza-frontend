import React from 'react';
import { useChat } from '@/context/ChatContext';

export const ShortQuestionsForm = ({ onSelectQuestion }) => {
  const { isSending, setIsSending } = useChat();

  const questions = [
    {
      id: 1,
      text: "¿Que es campuslands?",
    },
    {
      id: 2,
      text: "¿Cuanto cuesta?",
    },
    {
      id: 3,
      text: "¿Cuales son los horarios?",
    }
  ];

  const handleQuestionClick = async (questionText) => {
    if (isSending) return; // Prevenir múltiples clics
    
    try {
      setIsSending(true);
      await onSelectQuestion(questionText);
    } finally {
      // Asegurarse de que isSending se resetee después de un tiempo
      setTimeout(() => {
        setIsSending(false);
      }, 1000);
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-700/50 max-w-lg w-[90%] sm:w-[80%] md:w-[70%]">
      <p className="text-white/90 mb-4">¡Te puedo ayudar con algunas preguntas frecuentes! 🤔</p>
      <div className="space-y-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => handleQuestionClick(question.text)}
            disabled={isSending}
            className={`w-full px-4 py-2 rounded-lg
                       text-slate-900 text-left text-base
                       bg-cyan-400 hover:bg-cyan-400/90 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};