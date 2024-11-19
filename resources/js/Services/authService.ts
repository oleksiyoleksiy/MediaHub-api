import axiosInstance from "../Api/axiosInstance";

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
};
