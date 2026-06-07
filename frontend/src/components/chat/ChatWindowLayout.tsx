import ChatWelcomeScreen from "@/components/chat/ChatWelcomeScreen";
import ChatWindowBody from "@/components/chat/ChatWindowBody";
import ChatWindowHeader from "@/components/chat/ChatWindowHeader";
import ChatWindowSkeleton from "@/components/skeleton/ChatWindowSkeleton";
import MessageInput from "@/components/chat/MessageInput";
import { SidebarInset } from "@/components/ui/sidebar";
import { useChatStore } from "@/stores/useChatStore"
import { useEffect } from "react";


const ChatWindowLayout = () => {
  const { activeConversationId, conversations, messageLoading: loading, markAsSeen } = useChatStore();

  const SelectedConvo = conversations.find((c) => c._id === activeConversationId) ?? null;

  useEffect(() => {
    if (!SelectedConvo) return;

    markAsSeen().catch((error) => {
      console.error("Lỗi khi mark as seen:", error);
    });
  }, [markAsSeen, SelectedConvo]);


  if (!SelectedConvo) {
    return <ChatWelcomeScreen />
  }

  if (loading) {
    return <ChatWindowSkeleton />
  }
  return (
    <SidebarInset className="flex flex-col h-full flex-1 overflow-hidden rounded-sm shadow-md">
      {/* header */}
      <ChatWindowHeader chat={SelectedConvo} />
      {/* Body */}
      <div className="flex-1 overflow-y-auto bg-primary-foreground ">
        <ChatWindowBody />
      </div>
      {/* Footer */}
      <MessageInput selectedConvo={SelectedConvo} />

    </SidebarInset>
  )
}

export default ChatWindowLayout