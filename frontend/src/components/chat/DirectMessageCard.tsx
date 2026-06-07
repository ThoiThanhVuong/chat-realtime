import ChatCard from '@/components/chat/ChatCard'
import StatusBadge from '@/components/chat/StatusBadge';
import UnreadCountBadge from '@/components/chat/UnreadCountBadge';
import UserAvatar from '@/components/chat/UserAvatar';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore'
import { useChatStore } from '@/stores/useChatStore';
import { useSocketStore } from '@/stores/useSocketStore';
import { Conversation } from '@/types/chat'

const DirectMessageCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const { onlineUsers } = useSocketStore();
  const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore();
  if (!user) return null;

  const otherUser = convo.participants.find((p) => p._id !== user._id);
  if (!otherUser) return null;

  const unreadCount = convo.unreadCounts[user._id];
  const lastMessage = convo.lastMessage?.content ?? "";

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      await fetchMessages(id);
    }

  }
  return (
    <ChatCard
      convoId={convo._id}
      name={otherUser.displayName ?? ""}
      timestamp={
        convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined
      }
      isActive={activeConversationId === convo._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      leftSection={
        <>
          {/* user avatar */}
          <UserAvatar type="sidebar" name={otherUser.displayName ?? ""} avatarUrl={otherUser.avatarUrl ?? undefined} />
          {/* status badge */}
          <StatusBadge status={onlineUsers.includes(otherUser?._id ?? "") ? "online" : "offline"} />
          {/* unread count */}
          {
            unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />
          }
        </>
      }
      subtitle={
        <p className={cn("text-sm truncate",
          unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground")}>
          {lastMessage}
        </p>
      }

    />
  )
}

export default DirectMessageCard