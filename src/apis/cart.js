import request from "@/utils/request"
// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return request('/member/cart', 'POST', { skuId, count })
}


// 获取购物车列表
export const getCartAPI = () => {
    return request('/member/cart', 'get')
}
// 删除购物车
export const delCartAPI = (ids) => {
    return request('/member/cart', 'delete', { ids })
}

// 合并购物车
export const megerCart = (data) => {
    return request('/member/cart/merge', 'post', data)
}