import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import Particles from "@tsparticles/vue3";
import Particles from "vue3-particles";
import '@/util/axios.config'
import locale from 'element-plus/dist/locale/zh-cn.mjs'

//解决表格重绘报错
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  }
  
  const _ResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
    constructor(callback) {
      callback = debounce(callback, 16);
      super(callback);
    }
  }

createApp(App)
.use(Particles)
.use(ElementPlus,{locale})
.use(store)
.use(router)
.mount('#app')
