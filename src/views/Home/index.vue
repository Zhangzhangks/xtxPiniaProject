<template>
    <div class="container">
        <HomeBanners />
        <homeCategory />
    </div>
    <HomeNewGoods />
    <HomeHot />
    <HomeGoodsView />
</template>
<script setup >
import HomeBanners from './components/HomeBanners.vue';
import homeCategory from './components/homeCategory.vue';
import HomeGoodsView from './components/HomeGoodsView.vue';
import HomeHot from './components/HomeHot.vue';
import HomeNewGoods from './components/HomeNewGoods.vue';
</script>


<style lang='less' scoped></style>