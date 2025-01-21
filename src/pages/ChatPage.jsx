import { ChatNavbar } from '../components/ChatPage/ChatNavbar';
import { ChatHeader } from '../components/ChatPage/ChatHeader';
import { MessageList } from '../components/ChatPage/MessageList';
import { ChatInput } from '../components/ChatPage/ChatInput';
import { ChatContainer } from '../components/ChatPage/ChatContainer';

export const ChatPage = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-slate-900">
      <ChatNavbar />
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <ChatContainer />
      </div>
    </div>
  );
};