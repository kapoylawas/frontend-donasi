import axios from 'axios'

const Api = axios.create({
    // set endpoint default api
    baseURL: 'http://backend-donasi.test/api'
})

export default Api