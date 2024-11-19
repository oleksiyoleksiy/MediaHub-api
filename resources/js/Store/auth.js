import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const accessToken = ref(localStorage.getItem("accessToken"));
    const refreshToken = ref(localStorage.getItem("refreshToken"));
    const user = ref(undefined);

    const setToken = (tokens) => {
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

    const setUser = (value) => {
        user.value = value;
    };

    return { user, accessToken, refreshToken, setToken, setUser, logout };
});
