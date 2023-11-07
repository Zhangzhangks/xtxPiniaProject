// 一级类目名称逻辑

import { getCategoryApi } from '@/apis/category'
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

import { ref, onMounted } from 'vue';

export function useBannerList() {
    const TopCategory = ref({});
    const route = useRoute();
    // 路有缓存问题第二种
    const getValue = async (id) => {
        const { result } = await getCategoryApi(id || route.params.id)
        // console.log(result, '一级类目');
        TopCategory.value = result;
    }
    onBeforeRouteUpdate((to, from) => {
        // 存在问题：使用最新的路由参数请求最新的分类数据
        getValue(to.params.id)
    })

    onMounted(() => {
        getValue()
    })
    return { TopCategory }
}