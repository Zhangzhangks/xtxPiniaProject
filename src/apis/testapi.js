import request from "@/utils/request";


export const test = () => {
    return request('home/category/head', 'get')
}