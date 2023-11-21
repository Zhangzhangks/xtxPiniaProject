import { computed, onUnmounted, ref } from "vue"
import dayjs from "dayjs";

// 倒计时函数
export const useCountDown = () => {
    const time = ref(0);
    let timer = null;
    //1. 格式化后的时间
    const fortmatTime = computed(() => {
        return dayjs.unix(time.value).format('mm分ss秒')
    })
    //2. 开始定时器
    const start = (currentTime) => {
        time.value = currentTime;
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    onUnmounted(() => {
        timer && clearInterval(timer);
        timer = null;
    })
    return {
        start, fortmatTime
    }
}