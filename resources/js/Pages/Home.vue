<template>
    <div>
        <CRow v-if="user">
            {{ user.name }}
        </CRow>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import MainLayout from "../Layouts/MainLayout.vue";
import userService from "../Services/userService";
import { useAuthStore } from "../Store/auth";

export default {
    layout: MainLayout,
    setup() {
        const auth = useAuthStore();
        const user = ref();

        user.value = auth.user

        return {
            user,
        };
    },
};
</script>
