import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./user";

import { insertCartAPI, getCartAPI, delCartAPI } from "@/apis/cart";
export const useCartStore = defineStore(
    "cart",
    () => {

        const userStore = useUserStore();

        const cartList = ref([]);
        const addCartStore = async (playLoad) => {
            // 是否登录
            if (userStore && userStore.userInfo?.token) {
                // 登录
                //  发送请求
                await insertCartAPI({ skuId: playLoad.skuId, count: playLoad.count })
                findNewCartList()
            } else {
                //添加购物车
                //  是否添加过
                let index = cartList.value.findIndex(
                    (item) => item.skuId === playLoad.skuId
                );
                if (index === -1) {
                    cartList.value.push(playLoad);
                } else {
                    cartList.value[index].count += playLoad.count;
                }

            }


        };
        const deleteCart = async (skuId) => {
            if (userStore.userInfo.token) {
                await delCartAPI([skuId])
                findNewCartList()
            }
            else { //删除购物车
                let index = cartList.value.findIndex((item) => item.skuId === skuId);
                cartList.value.splice(index, 1);
            }
        };

        // 获取最新购物车
        async function findNewCartList() {
            const res = await getCartAPI();
            cartList.value = res.result;
        }


        const commonCount = computed(() => {
            return cartList.value.reduce((sum, goods) => {
                return sum + goods.count;
            }, 0);
        });
        const commonPrice = computed(() => {
            return cartList.value.reduce((sum, goods) => {
                return sum + parseFloat(goods.count * parseFloat(goods.price));
            }, 0);
        });
        // 单选
        const upadteCartListCheck = (skuId, select) => {
            let index = cartList.value.findIndex(item => item.skuId === skuId);
            cartList.value[index].selected = select;
        }
        // 全选
        const checkAll = computed(() => {
            return cartList.value.every(item => item.selected)
        })
        const updateCheckAll = (select) => {
            if (select) {
                cartList.value.forEach(item => item.selected = true)
            } else {
                cartList.value.forEach(item => item.selected = false)
            }
        }

        // 已选择数量
        const selectedCount = computed(() => {
            return cartList.value.filter(item => item.selected).length
        })
        // 已选择商品数量的和
        const selectedPrice = computed(() => {
            return cartList.value.filter(item => item.selected).reduce((sum, goods) => {
                return sum + parseFloat(goods.count * parseFloat(goods.price));
            }, 0);
        })

        const clearCart = () => {
            cartList.value = []
        }
        return { findNewCartList, clearCart, addCartStore, cartList, deleteCart, commonCount, commonPrice, selectedPrice, upadteCartListCheck, checkAll, updateCheckAll, selectedCount };
    },
    {
        persist: true,
    }
);
