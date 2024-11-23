import axiosInstance from "../api/axiosInstance";

interface Data {
    email: string;
    password: string;
}

interface Token {
    accessToken: string;
    refreshToken: string;
}

interface Service {
    login: (data: Data) => Promise<Token | undefined>;
    logout: () => Promise<boolean>;
}

export default <Service>{
    async login(data) {
        try {
            const response = await axiosInstance.post<Token>("/login", data);
            return response.data;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
        }
    },
    async logout() {
        try {
            await axiosInstance.post("/logout");
            return true;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
            return false;
        }
    },
};
