import { createWebHistory, createRouter } from "vue-router";

const routes = [

    {
        path: "/",
        component: () => import("@/views/LayOut/index.vue"),
        children: [
            { path: "", component: () => import("@/views/Home/index.vue") },
            { path: 'category/:id', component: () => import('@/views/Category/index.vue') },
            { path: 'category/sub/:id', component: () => import('@/views/SubCategory/index.vue') }
        ],
    },
    { path: "/login", component: () => import("@/views/Login/index.vue") },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
