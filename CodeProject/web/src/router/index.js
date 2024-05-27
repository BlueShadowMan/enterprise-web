import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import New from '../views/New.vue'
import Product from '../views/Product.vue'
import Job from '../views/Job.vue'
import JobItem from '../views/JobItem.vue'
import Privacy from '../views/Privacy.vue'
import Use from '../views/Use.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/job',
    name: 'job',
    component: Job
  },
  {
    path: '/job/:id',
    name: 'jobItem',
    component: JobItem
  },
  {
    path: '/news/:id',
    name: 'new',
    component: New
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/use',
    name: 'use',
    component: Use
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{
	NProgress.start()
	next()
})

router.afterEach((to,from)=>{
	NProgress.done()
})

export default router
