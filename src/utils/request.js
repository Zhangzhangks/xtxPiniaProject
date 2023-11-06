import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 3000
})


instance.interceptors.request.use(config => {
    return config
});
instance.interceptors.response.use(res => {

    return res.data
}, (error) => {
    return Promise.reject(error)
})

export default function request(url, method = 'get', submit) {
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submit
    })

}