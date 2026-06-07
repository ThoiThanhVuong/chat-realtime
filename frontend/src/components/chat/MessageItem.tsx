import UserAvatar from "@/components/chat/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn, formatMessageTime } from "@/lib/utils";
import { Conversation, Message, Participant } from "@/types/chat"

interface MessageItemProps {
    message: Message;
    index: number;
    messages: Message[];
    selectedConvo: Conversation;
    lastMessageStatus: "delivered" | "seen";
}
const MessageItem = ({ message, index, messages, selectedConvo, lastMessageStatus }: MessageItemProps) => {
    const prev = index + 1 < messages.length ? messages[index + 1] : undefined;
    const isShowTime = index === 0 || new Date(message.createdAt).getTime() - new Date(prev?.createdAt || 0).getTime() > 300000; // 5 phut
    const isGroupBeak = isShowTime || message.senderId !== prev?.senderId;

    const participant = selectedConvo.participants.find((p: Participant) => p._id.toString() === message.senderId.toString())

    return (
        <>
            {/* time */}
            {isShowTime && (
                <div className="flex justify-center my-2">
                    <span className="text-xs text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-full">
                        {formatMessageTime(new Date(message.createdAt))}
                    </span>
                </div>
            )}

            <div className={cn("flex gap-2 message-bounce mt-1",
                message.isOwn ? "justify-end" : "justify-start"
            )}
            >
                {/* Avatar */}
                {!message.isOwn && (
                    <div className="w-8">
                        {isGroupBeak && (
                            <UserAvatar
                                type="chat"
                                name={participant?.displayName ?? "moji"}
                                avatarUrl={participant?.avatarUrl ?? undefined}
                            />
                        )}
                    </div>
                )}
                {/* Tin nhắn */}
                <div className={cn("max-w-sx lg:max-w-md space-y-1 flex flex-col",
                    message.isOwn ? "items-end" : "items-start"
                )}>
                    <Card className={cn("p-3",
                        message.isOwn ? "chat-bubble-sent border-0" : "chat-bubble-received"
                    )}>
                        <p className="text-sm leading-relaxed break-word">{message.content}</p>
                    </Card>

                    {/* seen / delivered */}
                    {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
                        <Badge
                            variant="outline"
                            className={cn("text-xs px-1.5 py-0.5 h-4 border-0",
                                lastMessageStatus === 'seen' ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                            )}
                        >
                            {lastMessageStatus}
                        </Badge>
                    )}
                </div>
            </div>
        </>
    )
}

export default MessageItem