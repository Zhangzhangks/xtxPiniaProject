import { useIntersectionObserver } from '@vueuse/core'
export const lazyImg = {
    // 全局自定义懒加载指令
    install(app) {
        app.directive('lazy', {
            mounted(el, bilding) {
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            el.src = bilding.value;
                            stop()
                        }
                    },

                )

            }

        })
    }
}