<template>
	<div>
		<el-page-header
			content="编辑新闻" 
			@back="handleBack"
			title="新闻管理" 
		/>
		<el-form
		    ref="newsFormRef"
		    :model="newsForm"
		    :rules="newsFormRules"
		    label-width="80px"
		    class="demo-ruleForm"
		>
		    <el-form-item 
				label="标题" 
				prop="title"
			>
				<el-input v-model="newsForm.title" />
		    </el-form-item>
			<el-form-item
				label="内容" 
				prop="content"
			>
				<Editor 
					@event="handleChange" 
					:content="newsForm.content"
					v-if="newsForm.content"
				/>
			</el-form-item>
			<el-form-item
				label="类别" 
				prop="category"
			>
				<el-select
				    v-model="newsForm.category"
					class="m-2"
				    placeholder="Select"
					style="width: 100%;"
				>
				    <el-option
				        v-for="item in options"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"
				    />
				</el-select>
			</el-form-item>
			<el-form-item
				label="封面" 
				prop="cover"
			>
				<Upload
					:avatar="newsForm.cover"
					@change="handleUploadChange"
				/>
			</el-form-item>
			<el-form-item>
				<el-button 
					type="primary" 
					@click="submitForm()"
			    >更新新闻</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
	import {ref,reactive,onMounted} from 'vue'
	import { useRouter,useRoute } from 'vue-router';
	import Editor from '@/components/editor/Editor'
	import upload from '@/util/upload'
	import Upload from '@/components/upload/Upload'
	import axios from 'axios'
	
	const router = useRouter()
	const route = useRoute()
	const newsFormRef = ref()
	const newsForm = reactive({
		title: '',
		content: '',
		category: 1,	//1 最新动态 2典型案例 3 通知公告
		cover: '',
		file: null,
		isPublish: 0	//0未发布 1已发布
	})
	
	const newsFormRules = reactive({
		title:[
			{required: true,message: '请输入标题',trigger: 'blur'}
		],
		content:[
			{required: true,message: '请输入内容',trigger: 'blur'}
		],
		category:[
			{required: true,message: '请选择分类',trigger: 'blur'}
		],
		cover:[
			{required: true,message: '请上传图片',trigger: 'blur'}
		]
	})
	
	//每次editor内容改变的回调
	const handleChange = (data)=>{
		// console.log(data)
		newsForm.content = data
	}
	
	//新闻类别列表
	const options = [
		{
			label: '最新动态',
			value: 1
		},
		{
			label: '典型案例',
			value: 2
		},
		{
			label: '通知公告',
			value: 3
		}
	]
	
	//上传封面回调
	const handleUploadChange = (file)=>{
		newsForm.cover = URL.createObjectURL(file)
		newsForm.file = file
	}
	
	//校验提交创建新闻
	const submitForm = ()=>{
		newsFormRef.value.validate(async (valid)=>{
			if(valid) {
				console.log(newsForm)
				//后台通信更新新闻
				await upload('/adminapi/news/list',newsForm)
				router.back()
			}
		})
	}
	
	//返回按钮回调
	const handleBack = ()=>{
		router.back()
	}
	
	//取当前页面数据
	onMounted(async ()=>{
		// console.log(route.params.id)
		const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
		
		console.log(res.data.data[0])
		Object.assign(newsForm,res.data.data[0])
	})
</script>

<style lang="scss" scoped>
	.el-form {
		margin-top: 50px;
	}
</style>