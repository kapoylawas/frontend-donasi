//import vuex
import { createStore } from 'vuex'
//import module auth
import auth from './module/auth'
//import module donation
import donation from './module/donation'
//import module donation
import profile from './module/profile'

//create store vuex
export default createStore({

    modules: {
        auth, // <-- module auth
        donation, // <-- module donation
        profile, // <-- module profile
    }

})