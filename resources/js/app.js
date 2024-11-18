import "../scss/style.scss";
import "../scss/examples.scss";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import CoreuiVue from "@coreui/vue";
import CIcon from "@coreui/icons-vue";
import { createPinia } from "pinia";
import { iconsSet as icons } from "../../public/icons/index";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(createPinia())
            .use(CoreuiVue)
            .provide("icons", icons)
            .component("CIcon", CIcon)
            .mount(el);
    },
});
