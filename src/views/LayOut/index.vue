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

    <RouterView />

    <LayoutFooter />
</template>