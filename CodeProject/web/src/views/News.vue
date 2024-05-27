<template>
	<div class="container">
		<div class="news-header" :style="{
			backgroundImage:`url(${require('@/assets/newsbg.jpg')})`
		}">
			新闻资讯
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
					      placeholder="请输入新闻关键字"
					      :prefix-icon="Search"
						  type="search"
						  size="large"
						  @input="visible=true"
						  @blur="visible=false"
					/>
			    </template>
				<div v-if="searchNewsList.length">
					<div 
						v-for="data in searchNewsList" 
						:key="data._id"
						class="search-item"
						@click="handleChangePage(data._id)"
					>
						{{data.title}}
					</div>
				</div>
				<div v-else>
					<el-empty description="暂无新闻" :image-size="50"/>
				</div>
			</el-popover>
		</div>
		<div class="topnews">
			<el-row :gutter="20">
			    <el-col 
					:span="6"
					v-for="item in topNewsList"
					:key="item._id"
				>
					<el-card 
						:body-style="{padding: '0px',minHeight: '265px'}" 
						shadow="hover"
						@click="handleChangePage(item._id)"
					>
					    <div class="image" 
							:style="{backgroundImage:`url(http://localhost:3000${item.cover})`}"
						>
							
						</div>
						<div style="padding: 14px;">
							<span>{{item.title}}</span>
							<div class="bottom">
								<time class="time">{{whichTime(item.editTime)}}</time>
							</div>
						</div>
					</el-card>
				</el-col>
			  </el-row>
		</div>
		<el-tabs 
			style="margin: 20px;"
			v-model="whichTab" 
			class="demo-tabs" 
		>
		    <el-tab-pane 
				:key="item.name"
				v-for="item in tabList"
				:label="item.label" 
				:name="item.name"
			>
				<el-row :gutter="20">
					<el-col :span="18">
						<div
							v-for="data in tabnews[item.name]" 
							:key="data._id"
							style="padding: 10px ;"
						>
							<el-card 
								:body-style="{padding: '0px'}" 
								shadow="hover"
								@click="handleChangePage(data._id)"
							>
							    <div class="tab-image" 
									:style="{backgroundImage:`url(http://localhost:3000${data.cover})`}"
								>
									
								</div>
								<div style="padding: 14px; float: left;">
									<span>{{data.title}}</span>
									<div class="bottom">
										<time class="tab-time">{{whichTime(data.editTime)}}</time>
									</div>
								</div>
							</el-card>
						</div>
					</el-col>
					<el-col :span="6">
						 <el-timeline>
						    <el-timeline-item
								v-for="(data, index) in tabnews[item.name]"
								:key="index"
								:timestamp="whichTime(data.editTime)"
						    >
								{{ data.title}}
						    </el-timeline-item>
						</el-timeline>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
		<el-backtop visibility-height="100" />
	</div>
</template>

<script setup>
	import { Search } from '@element-plus/icons-vue'
	import { ref,onMounted, computed } from 'vue';
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
	const newsList = ref([])
	//选项卡
	const whichTab = ref(1)
	
	
	//获取全部新闻列表
	onMounted(async ()=>{
		const res = await axios.get('/webapi/news/list')
		// console.log(res.data)
		newsList.value = res.data.data
	})
	
	//搜索过滤的新闻列表
	const searchNewsList = computed(
		()=>searchText.value?newsList.value.filter(item=>item.title.includes(searchText.value)):[]
	)
	
	//新闻卡片
	const topNewsList = computed(()=>newsList.value.slice(0,4))
	
	//时间格式处理
	const whichTime = (time)=>{
		return moment(time).format('lll')
	}
	
	//选项卡数组
	const tabList = [
		{
			label: '最新动态',
			name: 1
		},
		{
			label: '典型案例',
			name: 2
		},
		{
			label: '通知公告',
			name: 3
		}
	]
	
	//选项卡分组新闻
	const tabnews = computed(()=>_.groupBy(newsList.value,item=>item.category))
	
	
	const router = useRouter()
	//新闻点击方法
	const handleChangePage = (id)=>{
		// console.log(id)
		
		router.push(`/news/${id}`)
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}
	
	.news-header {
		width: 100%;
		height: 400px;
		background-size: cover;
		text-align: center;
		color: white;
		font-size: 70px;
		line-height: 400px;
	}
	
	.search {
		position: absolute;
		top: 300px;
		width: 100%;
		text-align: center;
		.el-input {
			width: 50%;
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
	
	.topnews{
		margin: 20px;
		.image {
			width: 100%;
			height: 150px;
			background-size: cover;
		}
		
		.time {
			font-size: 13px;
			color: gray;
		}
		
		.bottom {
			
		}
	}
	
	.tab-image {
		width: 150px;
		height: 100px;
		background-size: cover;
		float: left;
	}
	
	.tab-time {
		font-size: 13px;
		color: gray;
	}
</style>