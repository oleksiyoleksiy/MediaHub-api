import axiosInstance from "../Api/axiosInstance";

interface User {
    name: string;
    email: string;
}

interface Service {
    fetch: (token: string) => Promise<User | undefined>;
}

export default <Service>{
    async fetch(token) {
        try {
            const response = await axiosInstance.get<User>("/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
        }
    },
};
