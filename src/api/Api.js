import axios from 'axios'

const Api = axios.create({
    // set endpoint default api
    baseURL: 'http://donasiapps.utama.appdev.my.id/api'
})

export default Api