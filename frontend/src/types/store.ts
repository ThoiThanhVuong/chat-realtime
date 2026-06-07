import { Conversation, Message } from "@/types/chat";
import { Friend, FriendRequest, User } from "@/types/user";
import { Socket } from "socket.io-client";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    signUp: (
        username: string,
        password: string,
        email: string,
        firstname: string,
        lastname: string
    ) => Promise<void>;

    signIn: (username: string, password: string) => Promise<void>;
    setUser: (user: User) => void;
    clearState: () => void;
    signOut: () => Promise<void>;
    fetchMe: () => Promise<void>;
    refreshToken: () => Promise<void>;
    setAccessToken: (accessToken: string) => void;
}

export interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (dark: boolean) => void;
}


export interface ChatState {
    conversations: Conversation[];
    messages: Record<string, {
        items: Message[],
        hasMore: boolean,
        nextCursor?: string | null
    }>;
    activeConversationId: string | null;
    convoLoading: boolean;
    messageLoading: boolean;
    loading: boolean;
    reset: () => void;
    setActiveConversation: (id: string | null) => void;
    fetchConversations: () => Promise<void>;
    fetchMessages: (conversationId: string) => Promise<void>;
    sendDirectMessage: (
        recipientId: string,
        content: string,
        imgUrl?: string
    ) => Promise<void>;
    sendGroupMessage: (
        conversationId: string,
        content: string,
        imgUrl?: string
    ) => Promise<void>;

    addMessage: (message: Message) => void;
    updateConversation: (conversation: Partial<Conversation> & { _id: string }) => void;

    markAsSeen: () => Promise<void>;
    addConvo: (convo: Conversation) => void;
    createConversation: (type: "direct" | "group", name: string, memberIds: string[]) => Promise<void>;

}

export interface SocketState {
    socket: Socket | null;
    onlineUsers: string[];
    connectSocket: () => void;
    disconnectSocket: () => void;
}

export interface FriendState {
    friends: Friend[];
    loading: boolean;
    receivedList: FriendRequest[];
    sentList: FriendRequest[];
    searchByUsername: (username: string) => Promise<User | null>;
    addFriend: (to: string, message?: string) => Promise<string>;
    getAllFriendRequests: () => Promise<void>;
    acceptRequest: (requestId: string) => Promise<void>;
    declineRequest: (requestId: string) => Promise<void>;
    getFriends: () => Promise<void>;
}

export interface UserState {
    updateAvatarUrl: (formData: FormData) => Promise<void>;
}