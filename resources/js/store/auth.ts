import { ref } from "vue";
import { defineStore } from "pinia";

interface TokenResponse {
    accessToken: string,
    refreshToken: string,
}

interface User {
    id: number,
    name: string,
    email: string,
    role: {
        permission: string
    }
}

export const useAuthStore = defineStore("auth", () => {
    const accessToken = ref<string | null>(localStorage.getItem("accessToken"));
    const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));
    const user = ref<User | undefined>(undefined);

    const setToken = (tokens: TokenResponse) => {
        accessToken.value = tokens.accessToken;
        refreshToken.value = tokens.refreshToken;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
    };

    const logout = () => {
        accessToken.value = null;
        refreshToken.value = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const setUser = (value: User) => {
        user.value = value;
    };

    return { user, accessToken, refreshToken, setToken, setUser, logout };
});
