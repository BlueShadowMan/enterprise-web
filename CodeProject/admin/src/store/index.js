import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
	  //是否配置过路由
	  isGetterRouter: false,
	  //侧边栏是否折叠
	  isCollapsed: false,
	  
	  userInfo: {}
  },
  getters: {
  },
  mutations: {
	  changeGetterRouter(state,value) {
		  state.isGetterRouter = value
	  },
	  //控制侧边栏的展开
	  changeCollapsed(state) {
		  state.isCollapsed = !state.isCollapsed
	  },
	  changeUserInfo(state,value) {
		  state.userInfo = {
			  ...state.userInfo,
			  ...value
		  }
	  },
	  clearUserInfo(state) {
		  state.userInfo = {}
	  }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
	  paths: ['isCollapsed','userInfo'],
	})]	//控制是否持久化
})
