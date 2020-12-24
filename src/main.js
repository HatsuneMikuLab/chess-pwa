import { createApp } from 'vue'
import Store from './store'
import App from './App.vue'

createApp(App)
.use(Store)
.mount('#app')