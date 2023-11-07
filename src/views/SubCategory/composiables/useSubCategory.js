import { getCategoryFilterAPI } from '@/apis/subCategory'
import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router';

export function useSubCategory() {
    const subcategory = ref({});
    const route = useRoute()
    const getSubCategory = async () => {
        const { result } = await getCategoryFilterAPI(route.params.id)
        // console.log(result, '二级分类');
        subcategory.value = result
    }
    onMounted(() => {
        getSubCategory()
    })
    return { subcategory }
}