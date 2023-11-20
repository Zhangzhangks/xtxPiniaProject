import request from "@/utils/request";


export const loginApi = (data) => {
    return request('/login', 'post', data)
}