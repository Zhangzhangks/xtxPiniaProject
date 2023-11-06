<script setup>
import { getBanner } from '@/apis/home'
import { ref, onMounted } from 'vue';
const bannerList = ref('');
onMounted(async () => {
    const { result } = await getBanner();
    // console.log(result,'轮播');
    bannerList.value = result
})
</script>
<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <router-link :to="item.hrefUrl">
                    <img :src="item.imgUrl" alt=""></router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style scoped lang='scss'>
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    img {
        width: 100%;
        height: 500px;
    }
}
</style>