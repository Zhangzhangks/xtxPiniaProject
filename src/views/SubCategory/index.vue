<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useSubCategory } from './composiables/useSubCategory'
import { getSubCategoryAPI } from '@/apis/subCategory'
import { useRoute } from 'vue-router';
import GoodsItems from '../Home/components/GoodsList.vue';

// 二级分类导航名称
// console.log(subcategory);

const subGoodList = ref([]);
const { subcategory } = useSubCategory();
const route = useRoute();

const reqData = reactive({
    categoryId: route.params.id,
    page: 1,//页数
    pageSize: 20,//每页几条
    sortField: 'publishTime'

});
const getSubGoodList = async () => {
    let { result } = await getSubCategoryAPI(reqData);
    subGoodList.value = result.items
    // console.log(result,'二级分类的数据');
}
onMounted(() => {
    getSubGoodList();

})

// 切换筛选条件
const disabled = ref(false)
const loading = ref(false)
const tabChange = () => {
    reqData.page = 1
    getSubGoodList(reqData)
}
const load = async function () {
    loading.value = true
    reqData.page++;
    let { result } = await getSubCategoryAPI(reqData);
    subGoodList.value = [...subGoodList.value, ...result.items]
    if (result.items.length === 0) {
        loading.value = false;
        return disabled.value = true
    }
}
</script>

<template>
    <div class="container " v-if="subcategory">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="`/category/${subcategory.parentId}`">{{ subcategory.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ subcategory.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-click="tabChange">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body">
                <!-- 商品列表-->
                <ul v-infinite-scroll="load" class="infinite-list" :infinite-scroll-disabled="disabled">
                    <li v-for="item in subGoodList" ::key="item.id" class="infinite-list-item">
                        <GoodsItems :good="item" />
                    </li>
                </ul>
                <p v-if="loading">Loading...</p>
                <p v-else>No more</p>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
}

.infinite-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
}
</style>