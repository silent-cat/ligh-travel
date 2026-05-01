import { createApp } from 'vue'

import vant from 'vant'
import 'vant/lib/index.css'

import router from './router'
import App from './App.vue'

const app = createApp(App);

app.use(vant);
app.use(router)
app.mount('#app')
