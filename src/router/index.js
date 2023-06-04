import {createRouter, createWebHistory} from 'vue-router'
import Pages from "@/pages/Pages.vue";
import Panel from "primevue/panel";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Pages,
        },
        {
            path: '/model/:modelId',
            name: 'model',
            component: Pages,
        },
        {
            path: '/model/:modelId/version/:versionId',
            name: 'version',
            component: Pages
        }
    ]
})

export default router
