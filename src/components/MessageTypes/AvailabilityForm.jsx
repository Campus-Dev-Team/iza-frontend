import React, { useState } from "react";
import { useChat } from "@/context/ChatContext";
import { addAvailability } from "@/services/userService";

export const AvailabilityForm = ({ message }) => {
  const { submitAvailability } = useChat();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (hasAvailability) => {
    if (isSubmitting) return; // Prevenir múltiples envíos

    try {
      setIsSubmitting(true);
      const availability = hasAvailability ? "si" : "no";
      const datosAvailability = { availability };

      // Primero actualizamos el UI
      submitAvailability(hasAvailability);

      // Luego enviamos al servidor
      const response = await addAvailability(datosAvailability);
      console.log("disponibilidad enviada", response);
      return response;
    } catch (error) {
      console.error("error al registrar la disponibilidad", error);
    } finally {
      // Esperar un momento antes de permitir otro envío
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-slate-700/50 rounded-2xl p-4">
      <p className="text-white/90 mb-4">{message.message}</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleSubmit(true)}
          disabled={isSubmitting}
          className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200
                     ${isSubmitting
              ? 'bg-cyan-400/50 cursor-not-allowed'
              : 'bg-cyan-400 hover:bg-cyan-400/90'} 
                     text-slate-900`}
        >
          {isSubmitting ? 'Enviando...' : 'Sí, tengo disponibilidad'}
        </button>
        <button
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
          className={`flex-1 px-4 py-2 rounded-lg transition-all duration-200
                     ${isSubmitting
              ? 'bg-slate-600/50 cursor-not-allowed'
              : 'bg-slate-600 hover:bg-slate-500'} 
                     text-white`}
        >
          {isSubmitting ? 'Enviando...' : 'No tengo disponibilidad'}
        </button>
      </div>
    </div>
  );
};
