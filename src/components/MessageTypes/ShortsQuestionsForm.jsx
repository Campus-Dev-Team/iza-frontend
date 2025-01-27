import React from 'react';

export const ShortQuestionsForm = ({ onSelectQuestion }) => {
  const questions = [
    {
      id: 1,
      text: "¿Cuanto Vale?",
    },
    {
      id: 2, 
      text: "¿Que es campuslands?",
    },
    {
      id: 3,
      text: "¿Cuales son los horarios?",
    }
  ];

  return (
    <div className="bg-slate-700/50 rounded-2xl p-4 max-w-md w-full">
      <p className="text-white mb-4">Selecciona una pregunta frecuente:</p>
      <div className="space-y-3">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onSelectQuestion(question.text)}
            className="w-full bg-slate-800/50 text-white px-4 py-3 rounded-lg
                     border border-cyan-400/10 hover:bg-slate-800/70
                     focus:ring-2 focus:ring-cyan-400/30 
                     focus:border-cyan-400/30 transition-all
                     text-left hover:border-cyan-400/30"
          >
            {question.text}
          </button>
        ))}
      </div>
    </div>
  );
};