import './assets/main.css'
import { createApp } from 'vue/dist/vue.esm-bundler.js'

import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import store from './store'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
