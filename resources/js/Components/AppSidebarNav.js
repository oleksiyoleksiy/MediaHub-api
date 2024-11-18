import { defineComponent, h, ref, onMounted, resolveComponent } from "vue";
import { Link, usePage } from "@inertiajs/vue3";

import {
    CBadge,
    CSidebarNav,
    CNavItem,
    CNavGroup,
    CNavTitle,
} from "@coreui/vue";
import nav from "../_nav.js";

import simplebar from "simplebar-vue";
import "../../../node_modules/simplebar-vue/dist/simplebar.min.css";

const normalizePath = (path) =>
    decodeURI(path)
        .replace(/#.*$/, "")
        .replace(/(index)?\.(html)$/, "");

const isActiveLink = (currentPath, link) => {
    if (!link) {
        return false;
    }

    const targetPath = normalizePath(link);
    return normalizePath(currentPath) === targetPath;
};

const isActiveItem = (currentPath, item) => {
    if (isActiveLink(currentPath, item.to)) {
        return true;
    }

    if (item.items) {
        return item.items.some((child) => isActiveItem(currentPath, child));
    }

    return false;
};

const AppSidebarNav = defineComponent({
    name: "AppSidebarNav",
    components: {
        CNavItem,
        CNavGroup,
        CNavTitle,
    },
    setup() {
        const { url: currentPath } = usePage();
        const firstRender = ref(true);

        onMounted(() => {
            firstRender.value = false;
        });

        const renderItem = (item) => {
            // Виняток для CNavTitle
            if (item.component === "CNavTitle") {
                return h(
                    CNavTitle,
                    null, // Немає додаткових пропсів
                    { default: () => item.name } // Відображаємо тільки назву
                );
            }

            const isActive = isActiveLink(currentPath, item.to); // Перевірка активного стану

            if (item.items) {
                return h(
                    CNavGroup,
                    {
                        as: "div",
                        compact: true,
                        visible: item.items.some((child) =>
                            isActiveItem(currentPath, child)
                        ),
                    },
                    {
                        togglerContent: () => [
                            h(resolveComponent("CIcon"), {
                                customClassName: "nav-icon",
                                name: item.icon,
                            }),
                            item.name,
                        ],
                        default: () =>
                            item.items.map((child) => renderItem(child)),
                    }
                );
            }

            return item.to
                ? h(
                      Link,
                      {
                          href: item.to,
                          class: ["nav-link", isActive ? "active" : ""], // Динамічне додавання класу "active"
                          "aria-current": isActive ? "page" : null, // Додавання атрибута для доступності
                      },
                      {
                          default: () => [
                              item.icon
                                  ? h(resolveComponent("CIcon"), {
                                        customClassName: "nav-icon",
                                        name: item.icon,
                                    })
                                  : h(
                                        "span",
                                        { class: "nav-icon" },
                                        h("span", { class: "nav-icon-bullet" })
                                    ),
                              h("span", { class: "nav-name" }, item.name), // Назва посилання
                              item.badge &&
                                  h(
                                      CBadge,
                                      {
                                          class: "ms-auto",
                                          color: item.badge.color,
                                      },
                                      {
                                          default: () => item.badge.text,
                                      }
                                  ),
                          ],
                      }
                  )
                : h(
                      resolveComponent(item.component),
                      {
                          as: "div",
                          class: "nav-link",
                      },
                      {
                          default: () => item.name,
                      }
                  );
        };



        return () =>
            h(
                CSidebarNav,
                {
                    as: simplebar,
                },
                {
                    default: () => nav.map((item) => renderItem(item)),
                }
            );
    },
});

export { AppSidebarNav };
