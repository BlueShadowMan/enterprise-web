<template>
	<div class="container">
		<el-page-header
			content="岗位详情" 
			@back="handleBack"
			title="" 
		/>
		<el-card>
			<template #header>
				<div class="card-header clearBoth">
					<div style="float: left;"><h2>{{currentJob.name}}</h2>
					<div class="location">工作地点：{{currentJob.location}}</div></div>
					<div style="float: right;font-size: 20px;">岗位分类：{{handleCategory(currentJob.category)}}</div>
				</div>
			</template>
			<div class="description">岗位描述：{{currentJob.description}}</div>
			<div class="content">
				岗位内容：
				<div v-html="currentJob.content"></div>
			</div>
			<template #footer>发布日期：{{whichTime(currentJob.editTime)}}</template>
		</el-card>
	</div>
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
	
	const currentJob = ref({})
	
	watchEffect(async ()=>{
		// console.log(route.params.id)
		//针对旧版本Vue中route.params.id为undefined问题的解决，新版本Vue中可不用
		if(!route.params.id) return
		
		const res1 = await axios.get(`/webapi/job/list/${route.params.id}`)
		// const res2 = await axios.get(`/webapi/job/toplist?limit=4`)
		console.log(res1.data.data[0])
		// console.log(res2.data.data)
		currentJob.value = res1.data.data[0]
		// topNews.value = res2.data.data
	})
	
	//在组建取消挂载时销毁组件，新版本Vue中可不用
	onBeforeUnmount(()=>{
		stop()
	})
	
	//时间格式处理
	const whichTime = (time)=>{
		return moment(time).format('ll')
	}
	
	//分类解析
	const handleCategory = (category)=>{
		const arr = ['研发','运营','管理']
		return arr[category-1]
	}
	
	//返回页头
	const handleBack = ()=>{
		router.back()
	}
</script>

<style lang="scss" scoped>
	.el-card {
		max-width: 1000px;
		margin: 20px auto;
		.description,.content{
			margin-top: 20px;
			line-height: 30px;
		}
	}
	
	.card-header {
		.location {
			margin-top: 10px;
		}
	}
	
	.clearBoth::after {
		content: '';
		display: block;
		clear: both;
	}
	
	.el-page-header {
		width: 50%;
		font-size: 50px;
		margin: 0 auto;
	}
</style>