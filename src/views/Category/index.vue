<script setup>
import { getCategoryApi } from '@/apis/category'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { getBanner } from '@/apis/home'
import { ref, onMounted } from 'vue';
import GoodsList from '../Home/components/GoodsList.vue';
const bannerList = ref('');
onMounted(async () => {

})
const TopCategory = ref({});
const route = useRoute();
// 路有缓存问题第二种
const getValue = async (id) => {
    const { result } = await getCategoryApi(id || route.params.id)
    // console.log(result, '二级类目');
    TopCategory.value = result;
}
onBeforeRouteUpdate((to, from) => {
     // 存在问题：使用最新的路由参数请求最新的分类数据
    getValue(to.params.id)
})

const getbanner = async () => {
    const Bannerresult = await getBanner('2');
    // console.log(Bannerresult, '二级轮播图');
    bannerList.value = Bannerresult.result;
}
onMounted(() => {
    getbanner()
    getValue()
})
</script>

<template>
    <div class="top-category">
        <div class="container m-top-20" v-if="TopCategory.id">
            <!-- 面包屑 -->
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ TopCategory.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 轮播图 -->
            <div class="home-banner">
                <el-carousel height="500px">
                    <el-carousel-item v-for="item in bannerList" :key="item.id">
                        <img :src="item.imgUrl" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="sub-list">
                <h3>全部分类</h3>
                <ul>
                    <li v-for="i in TopCategory.children" :key="i.id">
                        <RouterLink to="/">
                            <img :src="i.picture" />
                            <p>{{ i.name }}</p>
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="ref-goods" v-for="item in TopCategory.children" :key="item.id">
                <div class="head">
                    <h3>{{ item.name }}</h3>
                </div>
                <div class="body">
                    <GoodsList v-for="good in item.goods" :good="good" :key="good.id" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.home-banner {
    width: 1240px;
    height: 500px;

    img {
        width: 100%;
        height: 500px;
    }
}

.top-category {
    h3 {
        font-size: 28px;
        color: #666;
        font-weight: normal;
        text-align: center;
        line-height: 100px;
    }

    .sub-list {
        margin-top: 20px;
        background-color: #fff;

        ul {
            display: flex;
            padding: 0 32px;
            flex-wrap: wrap;

            li {
                width: 168px;
                height: 160px;


                a {
                    text-align: center;
                    display: block;
                    font-size: 16px;

                    img {
                        width: 100px;
                        height: 100px;
                    }

                    p {
                        line-height: 40px;
                    }

                    &:hover {
                        color: $xtxColor;
                    }
                }
            }
        }
    }

    .ref-goods {
        background-color: #fff;
        margin-top: 20px;
        position: relative;

        .head {
            .xtx-more {
                position: absolute;
                top: 20px;
                right: 20px;
            }

            .tag {
                text-align: center;
                color: #999;
                font-size: 20px;
                position: relative;
                top: -20px;
            }
        }

        .body {
            display: flex;
            justify-content: space-around;
            padding: 0 40px 30px;
        }
    }

    .bread-container {
        padding: 25px 0;
    }
}
</style>