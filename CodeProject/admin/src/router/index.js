import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import routesConfig from './config.js'
import store  from '@/store'

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/mainbox',
		name: 'mainbox',
		component: MainBox
	},
	//mainbox的嵌套路由，后面根据权限动态添加
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//每次路由跳转之前，都会执行回调函数
router.beforeEach((to,from,next) => {
	if(to.name === 'login') {
		next()
	}else {
		//如果授权（已经登录过了）next()
		//未授权，重定向到login
		if(!localStorage.getItem('token')) {
			next({
				path: '/login'
			})
		}else {
			//如果是第一次，还没有配置路由
			if(!store.state.isGetterRouter) {
				//删除所以嵌套路由
				//mainbox 删除
				router.removeRoute('mainbox')
				ConfigRouter()
				next({
					path: to.fullPath
				})
			}else {
				next()
			}
		}
	}
})

//循环遍历config中的routes数组，动态添加配置路由
const ConfigRouter = () => {
	if(!router.hasRoute('mainbox')){
		router.addRoute({
			path: '/mainbox',
			name: 'mainbox',
			component: MainBox
		})
	}
	routesConfig.forEach(item => {
		checkPermission(item) && router.addRoute('mainbox',item)
	})
	
	//改变isGetterRouter = true
	store.commit('changeGetterRouter',true)
}

const checkPermission = (item)=>{
	if(item.requireAdmin) {
		return store.state.userInfo.role === 1
	}
	return true
}

export default router
