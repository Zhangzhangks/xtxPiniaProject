import request from "@/utils/request";


/**
 *
 * @param {number} id
 * @returns 获取二级分类列表
 */
export const getCategoryApi = (id) => {
    
    return request('/category', "get", { id })
}