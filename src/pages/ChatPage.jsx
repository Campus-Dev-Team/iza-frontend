import React from 'react';
import { ChatProvider } from '../context/ChatContext';
import { ChatNavbar } from '../components/ChatPage/ChatNavbar';
import { ChatHeader } from '../components/ChatPage/ChatHeader';
import { ChatContainer } from '../components/ChatPage/ChatContainer';

export const ChatPage = () => {
  return (
    <ChatProvider>
      <div className="h-screen flex overflow-hidden bg-slate-900">
        <ChatNavbar />
        <div className="flex-1 flex flex-col">
          <ChatHeader />
          <ChatContainer />
        </div>
      </div>
    </ChatProvider>
  );
};