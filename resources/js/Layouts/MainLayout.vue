<script setup>
import { CContainer } from "@coreui/vue";
import AppFooter from "../Components/AppFooter.vue";
import AppHeader from "../Components/AppHeader.vue";
import AppSidebar from "../Components/AppSidebar.vue";
import { useSidebarStore } from "../Store/sidebar";

const sidebar = useSidebarStore();
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
