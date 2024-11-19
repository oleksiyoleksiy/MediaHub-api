import axios from "axios";
import { useAuthStore } from "../Store/auth";
import { router } from "@inertiajs/vue3";
// import store from '../store'
// import { authActions } from '../store/authSlice'
// import { getNavigate } from '../navigate'

const axiosInstance = axios.create({
    baseURL: 'api',
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const auth = useAuthStore();
            try {

                const refreshToken = auth.refreshToken;

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                const response = await axios.post("api/refresh", null, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                auth.setToken(response.data);

                const { accessToken } = response.data;

                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                auth.logout();
                router.visit("/login");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
