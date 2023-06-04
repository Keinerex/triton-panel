import {createApp} from 'vue'
import {createPinia} from 'pinia'
import router from './router'
import PrimeVue from "primevue/config";
import App from './App.vue'
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import axios from "axios";


const pinia = createPinia()

const app = createApp(App)
app.use(pinia)

axios.defaults.baseURL = "http://127.0.0.1:5000/api"
axios.defaults.withCredentials = true

app.use(router)
    .use(PrimeVue)
    .use(ToastService)
    .component("Toast", Toast)
    .component("InputText", InputText)
    .component("Button", Button)
    .mount('#app');
