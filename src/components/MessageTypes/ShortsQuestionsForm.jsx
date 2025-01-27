import React from 'react';

export const ShortQuestionsForm = ({ onSelectQuestion }) => {
  const questions = [
    {
      id: 1,
      text: "¿Que es campuslands?",
    },
    {
      id: 2,
      text: "¿Como puedo entrar a Campuslands?",
    },
    {
      id: 3,
      text: "¿Cuales son los horarios?",
    }
  ];

  return (
    <div className="p-4 rounded-2xl bg-slate-700/50 max-w-lg w-[90%] sm:w-[80%] md:w-[70%]">
      <p className="text-white/90 mb-4">¡Te puedo ayudar con algunas preguntas frecuentes! 🤔</p>
      <div className="space-y-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onSelectQuestion(question.text)}
            className="w-full px-4 py-2 rounded-lg
                       text-slate-900 text-left text-base
                       bg-cyan-400 hover:bg-cyan-400/90 transition-colors"
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};