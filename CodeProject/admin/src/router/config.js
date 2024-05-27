import Home from '../views/Home/Home.vue'
import Center from '../views/Center/Center.vue'
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import NewsEdit from '../views/news-manage/NewsEdit.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductEdit from '../views/product-manage/ProductEdit.vue'
import JobAdd from '../views/job-manage/JobAdd.vue'
import JobList from '../views/job-manage/JobList.vue'
import JobEdit from '../views/job-manage/JobEdit.vue'
import NotFound from '../views/NotFound/NotFound.vue'


const routes = [
	{
		path: '/index',
		component: Home
	},
	{
		path: '/center',
		component: Center
	},
	{
		path: '/user-manage/adduser',
		component: UserAdd,
		requireAdmin: true
	},
	{
		path: '/news-manage/addnews',
		component: NewsAdd
	},
	{
		path: '/news-manage/newslist',
		component: NewsList
	},
	{
		path: '/news-manage/editnews/:id',
		component: NewsEdit
	},
	{
		path: '/user-manage/userlist',
		component: UserList,
		requireAdmin: true
	},
	{
		path: '/product-manage/addproduct',
		component: ProductAdd
	},
	{
		path: '/product-manage/productlist',
		component: ProductList
	},
	{
		path: '/product-manage/editproduct/:id',
		component: ProductEdit
	},
	{
		path: '/job-manage/addjob',
		component: JobAdd
	},
	{
		path: '/job-manage/joblist',
		component: JobList
	},
	{
		path: '/job-manage/editjob/:id',
		component: JobEdit
	},
	{
		path: '/',
		redirect: '/index'
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFound
	}
]

export default routes