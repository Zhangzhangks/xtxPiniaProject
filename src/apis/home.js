import request from "@/utils/request";

export const getBanner = (distributionSite = 1) => {
    return request('/home/banner', 'get', { distributionSite })
}
/**
 * 新鲜好物
 * @returns
 */
export const getNewsGoods = () => {
    return request('/home/new', 'get',)
}


// 人起推荐
export const getHotGoods = () => {
    return request('/home/hot', 'get',)
}

// 热门品牌
export const getBrand = () => {
    return request('/home/goods')
}