import React, { useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { addAge } from "@/services/userService";

export const AgeAvailabilityForm = ({ message }) => {
  const [age, setAge] = useState("");
  const { submitAge, answeredQuestions } = useChat();
  const inputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answeredQuestions.age || isSubmitting) return; // Prevenir envíos múltiples

    if (age && age >= 10 && age <= 100) {
      setIsSubmitting(true);
      try {
        // Enviar al servidor primero
        const datosAge = { age: parseInt(age, 10) };
        await addAge(datosAge);

        // Luego actualizar la UI
        submitAge(age);
        setAge('');
        inputRef.current?.blur();
        window.getSelection()?.removeAllRanges();
      } catch (error) {
        console.error("error al registrar la edad", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!answeredQuestions.age) {
        handleSubmit(e);
      }
    }
  };

  // Si ya se respondió, mostrar versión deshabilitada
  if (answeredQuestions.age) {
    return (
      <div className="bg-slate-700/50 rounded-2xl p-4 max-w-md opacity-75">
        <p className="text-white mb-4">{message.message}</p>
        <form className="space-y-4">
          <input
            type="number"
            value={age}
            disabled
            className="w-full bg-slate-800/30 rounded-lg px-4 py-2 text-white/50 
                     border border-cyan-400/5 cursor-not-allowed"
            placeholder="Enviado"
          />
        </form>
      </div>
    );
  }

  return (
    <div className="bg-slate-700/50 rounded-2xl p-4 max-w-md">
      <p className="text-white mb-4">{message.message}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={inputRef}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onKeyDown={handleKeyDown}
          min="10"
          max="100"
          disabled={isSubmitting}
          placeholder="Tu edad"
          className="w-full bg-slate-800/50 rounded-lg px-4 py-2 text-white 
                   border border-cyan-400/10 focus:ring-2 
                   focus:ring-cyan-400/30 focus:border-cyan-400/30 outline-none
                   disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!age.trim() || age < 10 || age > 100 || isSubmitting}
          className="w-full bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg
                   hover:bg-cyan-400/90 disabled:opacity-50 
                   disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Continuar'}
        </button>
      </form>
    </div>
  );
};
