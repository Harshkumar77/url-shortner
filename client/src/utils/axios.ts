import axios from "axios";

const request = axios.create()

const getAccessToken = () => axios.post('/auth/access_token').then(_ => _.data.access_token)

request.interceptors.request.use(
    async config => {
        const access_token = await getAccessToken()
        config.headers = {
            'Authorization': `Bearer ${access_token}`,
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

request.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await getAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return request(originalRequest);
    }
    return Promise.reject(error);
});

export default request