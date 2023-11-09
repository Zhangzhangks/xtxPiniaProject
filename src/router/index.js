import { createWebHistory, createRouter } from "vue-router";

const routes = [

    {
        path: "/",
        component: () => import("@/views/LayOut/index.vue"),
        children: [
            { path: "", component: () => import("@/views/Home/index.vue") },
            { path: 'category/:id', component: () => import('@/views/Category/index.vue') },
            { path: 'category/sub/:id', component: () => import('@/views/SubCategory/index.vue') },
            { path: 'detail/:id', component: () => import('@/views/Detail/index.vue') }
        ],
    },
    { path: "/login", component: () => import("@/views/Login/index.vue") },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { top: 0 }
    }
});

export default router;
