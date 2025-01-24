import React, { useState, useEffect } from 'react';
import { ChatProvider } from '../context/ChatContext';
import { ChatNavbar } from '../components/ChatPage/ChatNavbar';
import { ChatHeader } from '../components/ChatPage/ChatHeader';
import { ChatContainer } from '../components/ChatPage/ChatContainer';

export const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simula un tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia el estado después de 2 segundos (simulación)
    }, 2000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
  }, []);

  if (isLoading) {
    return (
      // Pantalla de carga con GIF
      <div className="h-screen flex justify-center items-center bg-slate-900">
        <img
          src="/public/gifs/loading.gif" // Ruta al GIF de carga
          alt="Cargando..."
          className="w-48 h-48 rounded-full "
          style={{ border: '10px solid #22d3ee' }}
        />
      </div>
    );
  }

  // Contenido principal
  return (
    <ChatProvider>
      <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-slate-900">
        <ChatNavbar />
        <div className="flex-1 flex flex-col min-h-0">
          <ChatHeader />
          <ChatContainer />
        </div>
      </div>
    </ChatProvider>
  );
};
