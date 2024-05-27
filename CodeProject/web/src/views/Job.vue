<template>
	<div class="container">
		<div class="job-header" :style="{
			backgroundImage:`url(${require('@/assets/job3.png')})`
		}">
			<div class="title">欢迎加入我们</div>
		</div>
		<div class="search">
			<el-popover
			    placement="bottom"
			    title="检索结果"
			    width="50%"
				:visible="visible"
			>
			    <template #reference>
					<el-input
					      v-model="searchText"
					      class="w-50 m-2"
					      placeholder="请输入职位"
					      :prefix-icon="Search"
						  type="search"
						  size="large"
						  @input="visible=true"
						  @blur="visible=false"
					/>
			    </template>
				<div v-if="searchJobList.length">
					<div 
						v-for="data in searchJobList" 
						:key="data._id"
						class="search-item"
						@click="handleChangePage(data._id)"
					>
						<span style="float: left;">职位：{{data.name}}</span>
						<span style="float: left;margin-left: 50px;">工作地点：{{data.location}}</span>
					</div>
				</div>
				<div v-else>
					<el-empty description="暂无职位" :image-size="50"/>
				</div>
			</el-popover>
		</div>
		<div class="filter">
			<el-row>
				<el-col :span="4" :offset="4">
					<div>
						<div style="float: left;">职位类别：</div>
						<el-button
						    type="primary"
						    bg
							@click="clear"
							style="float: right;margin-right: 10px;"
						>
						清空
						</el-button>
					</div>
					<el-radio-group v-model="checkCategory" style="margin-top: 20px;">
					      <el-radio :value="1" size="large" border>研发</el-radio>
					      <el-radio :value="2" size="large" border>运营</el-radio>
						  <el-radio :value="3" size="large" border>管理</el-radio>
					</el-radio-group>
					<div style="margin: 20px 0;">所在城市：</div>
					<el-input 
						v-model="checkLocation" 
						style="padding-right: 10px;"
						placeholder="请输入城市名"
					></el-input>
				</el-col>
				<el-col :span="8" :offset="4" :pull="2" style="min-height: 583px;">
					<div>已有岗位：</div>
					<el-card 
						v-for="item in filterSub.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
						@click="handleSub(item)"
						shadow="hover"
					>
						<div>
							{{item.name}}
							<div style="float: right;">
								<div>岗位分类：{{handleCategory(item.category)}}</div>
								<div style="font-size: 14px;">发布日期：{{whichTime(item.editTime)}} </div>
							</div>
						</div>
						<div style="font-size: 14px;">
							工作地点：{{item.location}}
						</div>
					</el-card>
					<!-- 分页相关 -->
					<el-pagination
						background
					   @size-change="handleSizeChange" 
					   @current-change="handleCurrentChange"
					   :current-page="currentPage" 
					   :page-sizes="[3,5]" 
					   :page-size="pageSize" 
					   layout="total, sizes, prev, pager, next, jumper" 
					   :total="filterSub.length"
					   class="page"
					>
					</el-pagination>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
	import { Search } from '@element-plus/icons-vue'
	import { ref,onMounted, computed, watchEffect } from 'vue';
	import axios from 'axios';
	import moment from 'moment';
	import _ from 'lodash'
	import { useRouter } from 'vue-router';
	moment.locale('zh-cn')
	
	//搜索框的文字
	const searchText = ref('')
	//控制弹出框的状态
	const visible = ref(false)
	//新闻列表
	const jobList = ref([])
	//筛选信息表单
	const checkCategory = ref(0)
	const checkLocation = ref('')
	//过滤后的侧边卡片列表
	const subList = ref([])
	
	//勾选时的筛选方法，写成计算属性更好
	// const handlChange = ()=>{
	// 	console.log(checkCategory.value)
	// 	subList.value =  jobList.value.filter((item)=>{
	// 		return item.category===checkCategory.value
	// 	})
	// 	console.log(subList.value)
	// }
	
	//分页相关
	const pageSize = ref(5)
	const total = ref(20)
	const currentPage = ref(1)
	
	const handleSizeChange = (size)=>{
		pageSize.value = size
		console.log(pageSize.value)
	}
	
	const handleCurrentChange = (page)=> {
		currentPage.value = page
		console.log(currentPage.value)
	}
	
	
	//计算属性
	const filterSub = computed(()=>{
		if(checkCategory.value!==0) {
			// console.log('选了种类')
			return jobList.value.filter((item)=>{
				return item.category===checkCategory.value&&item.location.includes(checkLocation.value)
			})
		}else if(checkCategory.value===0){
			// console.log('没有选种类')
			return jobList.value.filter((item)=>{
				return item.location.includes(checkLocation.value)
			})
		}
		else {
			return subList.value
		}
	})
	
	//清空勾选
	const clear = ()=>{
		checkCategory.value = 0
		checkLocation.value = ''
		subList.value = jobList.value
	}
	
	//侧边点击卡片
	const handleSub= (item)=>{
		// console.log(item._id)
		router.push(`/job/${item._id}`)
	}
	
	//获取全部岗位列表
	onMounted(async ()=>{
		const res = await axios.get('/webapi/job/list')
		// console.log(res.data.data)
		jobList.value = res.data.data
		subList.value = res.data.data
	})
	
	//搜索过滤的新闻列表
	const searchJobList = computed(
		()=>searchText.value
		?jobList.value.filter(item=>item.name.includes(searchText.value)||handleCategory(item.category)===searchText.value)
		:[]
	)
	
	//新闻卡片
	// const topNewsList = computed(()=>newsList.value.slice(0,4))
	
	//时间格式处理
	const whichTime = (time)=>{
		return moment(time).format('ll')
	}
	
	//选项卡数组
	const jobTypeList = [
		{
			label: '研发',
			name: 1
		},
		{
			label: '运营',
			name: 2
		},
		{
			label: '管理',
			name: 3
		}
	]
	
	//选项卡分组新闻
	// const tabnews = computed(()=>_.groupBy(newsList.value,item=>item.category))
	
	
	const router = useRouter()
	
	//职位搜索结果点击方法
	const handleChangePage = (id)=>{
		// console.log(id)
		router.push(`/job/${id}`)
	}
	
	//分类解析
	const handleCategory = (category)=>{
		const arr = ['研发','运营','管理']
		return arr[category-1]
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		padding-bottom: 20px;
		// background-color: aliceblue;
	}
	
	.job-header {
		height: 400px;
		background-size: cover;
		text-align: center;
		color: black;
		font-size: 70px;
		line-height: 400px;
		opacity: 70%;
		.title {
			color: black;
			opacity: 100%;
		}
	}
	
	.search {
		position: absolute;
		top: 370px;
		width: 100%;
		text-align: center;
		.el-input {
			width: 50%;
			height: 60px;
			// border: 1px black solid;
			// border-radius: 5px ;
			font-size: 17px;
		}
	}
	
	.search-item {
		height: 50px;
		line-height: 50px;
		&:hover {
			background-color: whitesmoke;
			color: red
		}
	}
	
	.filter {
		margin-top: 50px;
		// border: 1px black solid;
	}
	
	.el-card {
		margin-top: 20px;
	}
	
	.page {
		margin-top: 20px;
		position: absolute;
		bottom: 0;
	}
</style>