import axios from "axios"

const request = axios.create()

const getNewAccessToken = async () => {
  const newT = await axios
    .post("/auth/access_token")
    .then((_) => _.data.access_token)
  sessionStorage.setItem("access_token", newT)
  return newT
}

const currentAccessToken = async () => {
  if (!sessionStorage.getItem("access_token")) {
    const newT = await getNewAccessToken()
    sessionStorage.setItem("access_token", newT)
    return newT
  }
  return sessionStorage.getItem("access_token") as string
}

request.interceptors.request.use(
  async (config) => {
    const access_token = await currentAccessToken()
    config.headers = {
      Authorization: `Bearer ${access_token}`,
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await getNewAccessToken()
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token
      return request(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default request
