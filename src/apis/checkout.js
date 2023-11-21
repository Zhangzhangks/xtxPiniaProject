import request from "@/utils/request";


// 获取订单列表
export const getCheckoutList = () => {
    return request('/member/order/pre', 'get')
}

// 创建订单
export const createOrderAPI = (data) => {
    return request('/member/order', 'POST', data)
}