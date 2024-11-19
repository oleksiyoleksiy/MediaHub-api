<script setup>
import { onMounted } from "vue";
import { CContainer } from "@coreui/vue";
import AppFooter from "../Components/AppFooter.vue";
import AppHeader from "../Components/AppHeader.vue";
import AppSidebar from "../Components/AppSidebar.vue";
import { useAuthStore } from "../Store/auth";
import userService from "../Services/userService";

const auth = useAuthStore();

const fetchUser = async () => {
    try {
        const token = auth.accessToken;

        if (!token) {
            console.warn("Token is missing");
            return;
        }

        const response = await userService.fetch(token);

        if (response) {
            auth.setUser(response);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

onMounted(() => {
    fetchUser();
});
</script>

<template>
    <div>
        <AppSidebar />
        <div class="wrapper d-flex flex-column min-vh-100">
            <AppHeader />
            <div class="body flex-grow-1">
                <CContainer class="px-4" lg>
                    <slot />
                </CContainer>
            </div>
            <AppFooter />
        </div>
    </div>
</template>
