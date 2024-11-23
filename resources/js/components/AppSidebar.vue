<script setup>
import {
    CSidebar,
    CSidebarToggler,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarBrand,
    CCloseButton,
} from "@coreui/vue";
import { Link } from "@inertiajs/vue3";
import { logo } from "../../../public/brand/logo";
import { sygnet } from "../../../public/brand/sygnet";
import { useSidebarStore } from "../store/sidebar";
import CIcon from "@coreui/icons-vue";
import { AppSidebarNav } from "./AppSidebarNav";

const sidebar = useSidebarStore();
</script>

<template>
    <CSidebar
        class="border-end"
        colorScheme="dark"
        position="fixed"
        :unfoldable="sidebar.unfoldable"
        :visible="sidebar.visible"
        @visible-change="(value) => sidebar.toggleVisible(value)"
    >
        <CSidebarHeader class="border-bottom">
            <Link custom href="/">
                <CSidebarBrand v-bind="$attrs" as="a">
                    <CIcon
                        custom-class-name="sidebar-brand-full"
                        :icon="logo"
                        :height="32"
                    />
                    <CIcon
                        custom-class-name="sidebar-brand-narrow"
                        :icon="sygnet"
                        :height="32"
                    />
                </CSidebarBrand>
            </Link>
            <CCloseButton
                class="d-lg-none"
                dark
                @click="sidebar.toggleVisible()"
            />
        </CSidebarHeader>
        <AppSidebarNav />
        <CSidebarFooter class="border-top d-none d-lg-flex">
            <CSidebarToggler @click="sidebar.toggleUnfoldable()" />
        </CSidebarFooter>
    </CSidebar>
</template>
