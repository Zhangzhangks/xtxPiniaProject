// 一级轮播图逻辑
import { ref, onMounted } from "vue";
import { getBanner } from "@/apis/home";
export function useBanner() {
    const bannerList = ref("");
    const getBannerValue = async () => {
        const Bannerresult = await getBanner("2");
        // console.log(Bannerresult, '一级轮播图');
        bannerList.value = Bannerresult.result;
    };
    onMounted(() => {
        getBannerValue();
    });
    return {
        bannerList
    }
}
