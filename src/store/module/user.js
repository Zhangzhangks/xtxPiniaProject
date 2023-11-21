import { defineStore, storeToRefs } from "pinia";
import { loginApi } from '@/apis/login.js'
import { ref } from "vue";
import { useCartStore } from "./cart";
import { megerCart } from '@/apis/cart'



export const useUserStore = defineStore("user", () => {

    // 2. 定义获取接口数据的action函数
    const { cartList } = storeToRefs(useCartStore())
    const { clearCart, findNewCartList } = useCartStore()
    const userInfo = ref({});
    const getUserInfo = async (playload = {}) => {
        const res = await loginApi(playload)
        userInfo.value = res.result;
        megerCartInfo()
    }

    const megerCartInfo = async () => {
        await megerCart(cartList.value.map(item => {
            return {
                skuId: item.skuId,
                count: item.count,
                selected: item.selected
            }
        }))
        findNewCartList();
    }
    const clearInfo = () => {
        userInfo.value = {};
        clearCart()
    }

    return { userInfo, getUserInfo, clearInfo }
},
    {
        persist: {
            key: 'xtx-token',
            storage: localStorage,

        }
    }

)