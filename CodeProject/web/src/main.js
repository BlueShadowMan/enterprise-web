import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/dist/locale/zh-cn.mjs'

createApp(App)
.use(ElementPlus,{locale})
.use(store)
.use(router)
.mount('#app')
