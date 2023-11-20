<script setup>
import LayoutNav from './components/LayOutNav.vue'
import LayoutHeader from './components/LayoutHead.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { UseCategoryStore } from '@/store/module/category'
import { onMounted } from 'vue';
const CategoryStore = UseCategoryStore();
onMounted(() => {
    CategoryStore.getList()
})
</script>

<template>
    <LayoutNav />
    <LayoutHeader />

    <!-- 破坏路有缓存 -->
    <!-- 缓存问题：当路由path一样，参数不同的时候会选择直接复用路由对应的组件
                            解决方案：

                            1. 给 routerv-view 添加key属性，破坏缓存
                            2. 使用 onBeforeRouteUpdate钩子函数，做精确更新
                            实现方法在 D:\VueProject\xtxPiniaProject\src\views\Category\composiable\useTopCategory -->
    <RouterView :key="$route.path" />
    <!-- <RouterView></RouterView> -->
    <LayoutFooter />
</template>