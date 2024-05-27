<template>
	<el-row>
		<el-col :span="17" :offset="1">
			<div>
				<h2>{{currentNews.title}}</h2>
				<div class="time">
					{{whichTime(currentNews.editTime)}}
				</div>
				<el-divider>
					<el-icon><star-filled/></el-icon>
				</el-divider>
				<div v-html="currentNews.content" class="newsContent"></div>
			</div>
		</el-col>
		<el-col :span="4" :offset="1" :pull="1">
			 <el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span 
							style="font-size: 16px;font-weight: bold;"
						>最近新闻</span>
					</div>
				</template>
				<div 
					v-for="item in topNews"
					:key="item._id"
					class="text item"
					style="padding: 14px;"
					@click="handleChange(item._id)"
				>
					<span>{{item.title}}</span>
					<div class="bottom">
						<time class="time">
							{{whichTime(item.editTime)}}
						</time>
					</div>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<script setup>
	import axios from 'axios';
	import { onMounted,ref,watchEffect,onBeforeUnmount } from 'vue';
	import { useRoute,useRouter } from 'vue-router';
	import {StarFilled} from '@element-plus/icons-vue'
	import moment from 'moment';
	moment.locale('zh-cn')
	const route = useRoute()
	const router = useRouter()
	
	//当前新闻对象
	const currentNews = ref({})
	
	//最新新闻右边卡片模块数组
	const topNews = ref([])
	
	//页面加载时获取新闻数据，
	/* 路由变化时，route.params.id监听值为undefined，旧版Vue中服务器会报错。
	新版本Vue此时watchEffect不再执行，官方已经修复此bug
	*/
	watchEffect(async ()=>{
		// console.log(route.params.id)
		//针对旧版本Vue中route.params.id为undefined问题的解决，新版本Vue中可不用
		if(!route.params.id) return
		
		const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
		const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
		// console.log(res1.data.data[0])
		// console.log(res2.data.data)
		currentNews.value = res1.data.data[0]
		topNews.value = res2.data.data
	})
	
	//在组建取消挂载时销毁组件，新版本Vue中可不用
	onBeforeUnmount(()=>{
		stop()
	})
	
	//时间格式处理
	const whichTime = (time)=>{
		return moment(time).format('lll')
	}
	
	//右边卡片新闻点击跳转回调
	const handleChange = (id)=>{
		console.log(id)
		router.push(`/news/${id}`)
	}
</script>

<style lang="scss" scoped>
	.el-row {
		margin-top: 30px;
	}
	
	.time {
		font-size: 13px;
		color: gray;
	}
	
	.newsContent{
		line-height: 26px;
		padding-right: 20px ;
	}
</style>