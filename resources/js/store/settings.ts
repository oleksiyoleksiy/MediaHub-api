import { ref } from "vue";
import { defineStore } from "pinia";

interface Settings {
    id: number;
    type: string;
    name: string;
    content: string;
}

export const useSettingsStore = defineStore("settings", () => {
    const settings = ref<Settings[] | undefined>();

    const setSettings = (value: Settings[]) => {
        settings.value = value;
    };

    const addSettings = (value: Settings) => {
        if (!settings.value) {
            settings.value = [];
        }

        settings.value.push(value);
    };

    const updateSettings = (value: Settings) => {
        if (settings.value) {
            settings.value = settings.value.map((s) =>
                s.id === value.id ? value : s
            );
        }
    };

    const getSettingContent = (type: string, name: string) => {
        if (settings.value) {
            const setting = settings.value.find(
                (s) => s.type === type && s.name === name
            );

            return setting?.content;
        }
    };

    const deleteSettings = (id: number) => {
        if (settings.value) {
            settings.value = settings.value.filter((s) => s.id !== id);
        }
    };

    return {
        settings,
        setSettings,
        addSettings,
        deleteSettings,
        updateSettings,
        getSettingContent,
    };
});
