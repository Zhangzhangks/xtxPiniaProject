import request from '@/utils/request'

export const getOrderAPI = (id) => {

    return request(`/member/order/${id}`)
}