import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { AuthState } from "@/types/store";
import { persist } from "zustand/middleware";
import { useChatStore } from "@/stores/useChatStore";

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            user: null,
            loading: false,

            setAccessToken: (accessToken) => set({ accessToken }),
            setUser: (user) => set({ user }),
            clearState: () => {
                set({
                    accessToken: null,
                    user: null,
                    loading: false,
                });
                useChatStore.getState().reset();
                localStorage.clear();
                sessionStorage.clear();

            },
            signUp: async (username, password, email, firstname, lastname) => {
                try {
                    set({ loading: true });
                    // goi API
                    await authService.signUp(username, password, email, firstname, lastname);
                    toast.success("Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập")
                } catch (error) {
                    console.error(error);
                    toast.error("Đăng ký không thành công!");
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },
            signIn: async (username, password) => {
                try {
                    get().clearState();
                    set({ loading: true });

                    const { accessToken } = await authService.signIn(username, password);
                    get().setAccessToken(accessToken);
                    await get().fetchMe();
                    await useChatStore.getState().fetchConversations();

                    toast.success("Chào mừng quay lại mới Moji!");

                } catch (error) {
                    console.error(error);
                    toast.error("Đăng nhập không thành công!");
                    throw error;
                } finally {
                    set({ loading: false });
                }
            },

            signOut: async () => {
                try {
                    get().clearState();
                    await authService.signOut();
                    toast.success("Bạn đã đăng xuất thành công");
                } catch (error) {
                    console.error(error);
                    toast.error("Đăng xuất không thành công! Hãy thử l");
                    throw error;
                }
            },

            fetchMe: async () => {
                try {
                    set({ loading: true });
                    const user = await authService.fetchMe();
                    set({ user })

                } catch (error) {
                    console.error(error);
                    set({ user: null, accessToken: null });
                    toast.error("Lỗi khi lấy dữ liệu người dùng! Vui lòng thử lại")

                } finally {
                    set({ loading: false });
                }
            },
            refreshToken: async () => {
                try {
                    set({ loading: true });
                    const { user, fetchMe } = get();
                    const accessToken = await authService.refreshToken();
                    get().setAccessToken(accessToken);
                    if (!user) {
                        await fetchMe();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại");
                    get().clearState();
                } finally {
                    set({ loading: false });
                }
            }



        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user }),
        }
    )
)