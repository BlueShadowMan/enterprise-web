<template>
	<div class="navbar">
		<el-menu
		    :default-active="route.fullPath"
		    class="el-menu-demo"
		    mode="horizontal"
			:router="true"
		>
		    <el-menu-item index="/">首页</el-menu-item>
			<el-menu-item index="/news">新闻中心</el-menu-item>
			<el-menu-item index="/product">产品与服务</el-menu-item>
			<el-menu-item index="/job">人才招聘</el-menu-item>
			<el-menu-item index="" @click="handleClick">管理登录</el-menu-item>
			<div class="right">企业门户官网</div>
		</el-menu>
	</div>
</template>

<script setup>
	import {useRoute} from 'vue-router'
	const route = useRoute()
	
	const handleClick = ()=>{
		window.location = 'http://localhost:8081'
	}
</script>

<style lang="scss" scoped>
	.navbar {
		position: sticky;
		top: 0px;
		z-index: 1000;
	}
	
	.right {
		position: fixed;
		top: o;
		right: 20px;
		width: 100px;
		height: 59px;
		line-height: 59px;
		text-align: center;
	}
</style>