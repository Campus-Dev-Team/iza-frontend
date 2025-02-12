import React from "react";
import { useChat } from "@/context/ChatContext";

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
      <p className="text-white/90 mb-4">¿En qué te puedo colaborar hoy? 🤔</p>
      <div className="space-y-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => handleQuestionClick(question.text)}
            disabled={isSending}
            className={`w-full px-4 py-2 rounded-lg
                      text-left text-base text-white
                       bg-slate-600/50 hover:bg-slate-500 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};
