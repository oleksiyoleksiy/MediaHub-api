import axios from "axios";
import { useAuthStore } from "../store/auth";
import router from "../router"; // Імпортуємо router напряму, а не через `useRouter`

const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        Accept: "application/json",
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const auth = useAuthStore();
        const accessToken = auth.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const auth = useAuthStore();
            try {
                const refreshToken = auth.refreshToken;

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Refresh token
                const response = await axios.post("/api/refresh", null, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                auth.setToken(response.data);

                const { accessToken } = response.data;

                // Update authorization header for all requests
                axiosInstance.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${accessToken}`;

                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);

                // Logout user and redirect
                auth.logout();

                // Redirect to login
                await router.push({ name: "login" });

                return Promise.reject(refreshError);
            }
        }

        // Return the error if not a 401 or already retried
        return Promise.reject(error);
    }
);

export default axiosInstance;
