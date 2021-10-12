import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import Vant from 'vant'
import 'vant/lib/index.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Vant)
  .mount('#app')
