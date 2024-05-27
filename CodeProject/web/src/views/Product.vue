<template>
	<div>
		<el-carousel 
			height="calc(100vh - 59px)" 
			direction="vertical" 
			:autoplay="false"
			v-if="looplist.length"
		>
		    <el-carousel-item 
				v-for="item in looplist" 
				:key="item._id"
			>
				<div 
					class="item" 
					:style="{backgroundImage:`url(http://localhost:3000${item.cover})`}">
					 <el-card class="box-card">
					    <template #header>
							<div class="card-header">
								<h2>{{item.title}}</h2>
							</div>
					    </template>
					    <div>
							{{item.introduction}}
						</div>
						<div class="detail">
							{{item.detail}}
						</div>
						<div class="more">
							更多信息，请访问
							<br />
							http://www.baidu.com
						</div>
					</el-card>
				</div>
		    </el-carousel-item>
		</el-carousel>
		<el-empty description="暂无产品" v-else/>
	</div>
</template>

<script setup>
	import axios from 'axios';
	import { onMounted, ref } from 'vue';
	
	//轮播循环列表
	const  looplist = ref([])
	
	//页面加载时请求数据
	onMounted(async()=>{
		const res = await axios.get(`/webapi/product/list`)
		// console.log(res.data.data)
		looplist.value = res.data.data
	})
</script>

<style lang="scss" scoped>
	.item {
		width: 100%;
		height: 100%;
		background-size: cover;
	}
	
	.box-card {
		width: 50%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.7);
	}
	
	.detail,.more {
		margin-top: 20px;
	}
</style>