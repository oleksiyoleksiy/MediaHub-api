<template>
    <div>
        <CRow v-if="user">
            {{ user.name }}
        </CRow>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import MainLayout from "../layouts/MainLayout.vue";
import userService from "../services/userService";
import { useAuthStore } from "../store/auth";

export default {
    layout: MainLayout,

    setup() {
        const auth = useAuthStore();
        const user = computed(() => auth.user);

        return { user };
    },
};
</script>
