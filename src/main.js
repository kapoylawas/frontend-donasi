import { createApp } from 'vue'
import App from './App.vue'
// Added by the CLI
import './registerServiceWorker';

createApp(App).use(router).mount('#app');

/**
 * import Toastr
 */
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

/**
 * Tailwind CSS
*/
import './index.css'

/**
 * Mixins
 */
import mixins from './mixins'

/**
 * Vue Router
 */
import router from './router'


/**
 * Vuex  
 */
 import store from './store'

//create App Vue
const app = createApp(App)

//gunakan "Toast" di Vue Js dengan plugin "use"
app.use(Toast)

//gunakan "Mixins" di Vue Js dengan plugin "use"
app.mixin(mixins)

//gunakan "router" di Vue Js dengan plugin "use"
app.use(router)

//gunakan "store" di Vue Js dengan plugin "use"
app.use(store)

app.mount('#app')