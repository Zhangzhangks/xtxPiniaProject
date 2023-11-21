import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/views/LayOut/index.vue"),
        children: [
            { path: "", component: () => import("@/views/Home/index.vue") },
            { path: 'category/:id', component: () => import('@/views/Category/index.vue') },
            { path: 'category/sub/:id', component: () => import('@/views/SubCategory/index.vue') },
            { path: 'detail/:id', component: () => import('@/views/Detail/index.vue') },
            { path: 'cartList', component: () => import('@/views/CartList/index.vue') },
            { path: 'checkout', component: () => import('@/views/Checkout/index.vue') },
            { path: 'pay', component: () => import('@/views/pay/index.vue') },
            {
                path: 'paycallback', // 注意路径，必须是paycallback
                component: () => import('@/views/pay/callback.vue')
            },
        ]
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
