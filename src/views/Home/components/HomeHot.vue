
<template>
    <homePannel title="人气推荐" subTitle="新鲜出炉 品质靠谱">
        <!-- 下面是插槽主体内容模版 -->
        <template #default>
            <ul class="goods-list">
                <li v-for="item in HotList" :key="item.id">
                    <RouterLink to="/">
                        <img v-lazy="item.picture" :alt="item.alt" />
                        <p class="name">{{ item.title }}</p>

                    </RouterLink>
                </li>
            </ul>
        </template>
    </homePannel>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import homePannel from './homePannel.vue';
import { getHotGoods } from '@/apis/home'
const HotList = ref()
onMounted(async () => {
    const { result } = await getHotGoods();
    // console.log(result);
    HotList.value = result
})
</script>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;

        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
        }
    }
}
</style>