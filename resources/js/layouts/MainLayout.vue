<script setup>
import { computed, onMounted } from "vue";
import { CContainer } from "@coreui/vue";
import AppFooter from "../components/AppFooter.vue";
import AppHeader from "../components/AppHeader.vue";
import AppSidebar from "../components/AppSidebar.vue";
import { useAuthStore } from "../store/auth";
import userService from "../services/userService";
import { useSettingsStore } from "../store/settings";
import settingsService from "../services/settingsService";

const auth = useAuthStore();
const settingsStore = useSettingsStore();
const settings = computed(() => settingsStore.settings);
const user = computed(() => auth.user);

const fetchSettings = async () => {
    const response = await settingsService.index();
    settingsStore.setSettings(response);
};

const fetchUser = async () => {
    try {
        const response = await userService.current();

        if (response) {
            auth.setUser(response);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

onMounted(() => {
    fetchUser();
    fetchSettings();
});
</script>

<template>
    <div
        v-if="!settings && !user"
        style="min-height: 100vh"
        class="d-flex w-100 justify-content-center align-items-center"
    >
        <CSpinner color="primary" />
    </div>
    <div v-else>
        <AppSidebar />
        <div class="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
            <div class="body flex-grow-1">
                <CContainer class="px-4" lg>
                    <router-view />
                </CContainer>
            </div>
            <AppFooter />
        </div>
    </div>
</template>
