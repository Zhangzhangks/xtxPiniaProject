import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import "@/styles/common.scss"
import pinia from './store'
import { lazyImg } from './directives/lazy-img'
// 批量注册组件
import componentPlugin from '@/components/libirary/install'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(lazyImg)
app.use(componentPlugin)
app.mount('#app')
