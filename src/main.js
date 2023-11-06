import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import "@/styles/common.scss"
import { pinia } from './store'
import { lazyImg } from './directives/lazy-img'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(lazyImg)
app.mount('#app')
