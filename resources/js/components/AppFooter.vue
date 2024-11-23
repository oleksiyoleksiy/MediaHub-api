<script setup>
import { computed } from "vue";
import { useSettingsStore } from "../store/settings";

const settingsStore = useSettingsStore();
const footerContent = computed(() => settingsStore.getSettingContent("footer", "text"));
</script>

<template>
    <CFooter class="px-4">
        <div>
            {{ footerContent }}
            <!-- <a href="https://coreui.io" target="_blank">CoreUI</a>
            <span class="ms-1"
                >&copy; {{ new Date().getFullYear() }} creativeLabs.</span
            > -->
        </div>
        <div class="ms-auto">
            <span class="me-1" target="_blank">Powered by</span>
            <a href="https://coreui.io/vue">CoreUI for Vue</a>
        </div>
    </CFooter>
</template>
