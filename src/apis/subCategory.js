import request from "@/utils/request";

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
    return request('/category/sub/filter', 'get', { id })
}
