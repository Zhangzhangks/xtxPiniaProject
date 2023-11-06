import request from "@/utils/request";


export const getCategory = () => {
    return request('/home/category/head', 'get')
}

