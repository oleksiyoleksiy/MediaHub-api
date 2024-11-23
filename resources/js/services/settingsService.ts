import axiosInstance from "../api/axiosInstance";
import { useSettingsStore } from "../store/settings";

interface Data {
    type: string;
    name: string;
    content: string;
}

interface Settings {
    id: string;
    type: string;
    name: string;
    content: string;
}

interface Service {
    index: (data: Data) => Promise<Settings[] | undefined>;
    store: (data: Data) => Promise<Settings | undefined>;
    update: (data: Data, id: number) => Promise<Settings | undefined>;
    destroy: (id: number) => Promise<boolean>;
}

export default <Service>{
    async index() {
        try {
            const response = await axiosInstance.get<Settings[]>("/settings");
            return response.data;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
        }
    },
    async store(data) {
        try {
            const response = await axiosInstance.post<Settings>(
                "/settings",
                data
            );
            return response.data;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
        }
    },
    async update(data, id) {
        try {
            const response = await axiosInstance.put<Settings>(
                `/settings/${id}`,
                data
            );
            return response.data;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
        }
    },
    async destroy(id) {
        try {
            await axiosInstance.delete<Settings>(`/settings/${id}`);
            return true;
        } catch (e) {
            if (e.response && e.response.data) {
                console.log(e.response.data);
            }
            return false;
        }
    },
};
