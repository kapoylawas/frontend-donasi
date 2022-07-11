import axios from 'axios'

const Api = axios.create({
    // set endpoint default api
    baseURL: 'https://donasiapps.utama.appdev.my.id/api'
})

export default Api