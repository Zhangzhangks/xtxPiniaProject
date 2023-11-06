import { defineStore } from 'pinia'
import { getCategory } from '@/apis/LayOut.js'
import { onMounted, ref } from 'vue';

export const UseCategoryStore = defineStore('category', () => {
    const categoryList = ref('')

    const getList = async () => {
        const data = await getCategory();
        // console.log(data,'首页导航');
        categoryList.value = data.result;
    }
    return { getList, categoryList }

})