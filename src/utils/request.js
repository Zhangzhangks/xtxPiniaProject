import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/store/module/user'
import router from '@/router'

const instance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 3000
})

instance.interceptors.request.use(config => {
    const userStore = useUserStore()
    let token = userStore.userInfo.token || '';

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});
instance.interceptors.response.use(res => {
    return res.data
}, (error) => {

    if (error.response?.status === 401) {
        const userStore = useUserStore()
        ElMessage({
            message: '登陆状态已过期!',
            duration: 3000,
            type: 'error',
        });

        userStore.clearInfo();
        router.push('/login')
    }
    ElMessage({
        message: error.response.data.message,
        duration: 3000,
        type: 'error',
    })
    return Promise.reject(error)
})

export default function request(url, method = 'get', submit) {
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submit,

    })

}