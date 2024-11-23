import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Login from "../pages/Login.vue";
import NotFound from "../pages/NotFound.vue";
import Home from "../pages/Home.vue";
import Settings from "../pages/Settings.vue";

const routes = [
    {
        path: "/",
        component: MainLayout,
        children: [
            {
                path: "",
                name: "admin.home",
                component: Home,
            },
            {
                path: "/settings",
                name: "admin.settings",
                component: Settings,
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },

    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;
