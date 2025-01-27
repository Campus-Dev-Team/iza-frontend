import React, { useRef, useState } from "react";
import { useChat } from "../../context/ChatContext";
import { addAge } from "@/services/userService";

export const AgeAvailabilityForm = ({ message }) => {
  const [age, setAge] = useState("");
  const { submitAge } = useChat();
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age && age >= 10 && age <= 100) {
      submitAge(age);
      setAge('');
      // Quitar el focus del input
      inputRef.current?.blur();
      // Limpiar cualquier selección de texto
      window.getSelection()?.removeAllRanges();
    }

    try {
      const datosAge = { age: parseInt(age, 10) };
      console.log("edad a enviar", datosAge);
      const response = await addAge(datosAge);
      console.log("edad enviada", response);
      return response;
    } catch (error) {
      console.error("error al registrar la edad", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-slate-700/50 rounded-2xl p-4 max-w-md">
      <p className="text-white mb-4">{message.message}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={inputRef}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="10"
          max="100"
          placeholder="Tu edad"
          className="w-full bg-slate-800/50 rounded-lg px-4 py-2 text-white 
                         border border-cyan-400/10 focus:ring-2 
                         focus:ring-cyan-400/30 focus:border-cyan-400/30 outline-none"
        />
        <button
          type="submit"
          disabled={!age.trim() || age < 10 || age > 100}
          className="w-full bg-cyan-400 text-slate-900 px-4 py-2 rounded-lg
                       hover:bg-cyan-400/90 disabled:opacity-50 
                       disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </form>
    </div>
  );
};
