import axiosInstance from "../api/axiosInstance";

interface User {
    name: string;
    email: string;
}

interface Service {
    current: () => Promise<User | undefined>;
}

export default <Service>{
    async current() {
        try {
            const response = await axiosInstance.get<User>("/user");
            return response.data;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
        }
    },
};
