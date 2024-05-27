<template>
	<div>
		<el-page-header
			content="职位管理" 
			@back="handleBack"
			title="更新职位" 
		/>
		<el-form
		    ref="jobFormRef"
		    :model="jobForm"
		    :rules="jobFormRules"
		    label-width="80px"
		    class="demo-ruleForm"
		>
		    <el-form-item 
				label="职位名称" 
				prop="name"
			>
				<el-input v-model="jobForm.name" />
		    </el-form-item>
			<el-form-item
				label="职位分类" 
				prop="category"
			>
				<el-select
				    v-model="jobForm.category"
					class="m-2"
				    placeholder="Select"
					style="width: 100%;"
				>
				    <el-option
				        v-for="item in options"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"
						style="z-index: 999;"
				    />
				</el-select>
			</el-form-item>
			<el-form-item
				label="所在城市" 
				prop="location"
			>
				<el-input v-model="jobForm.location" />
			</el-form-item>
			<el-form-item
				label="职位描述" 
				prop="description"
			>
				<el-input v-model="jobForm.description" type="textarea"/>
			</el-form-item>
			<el-form-item
				label="职位内容" 
			>
				<Editor 
					@event="handleChange"
					:content="jobForm.content"
					v-if="jobForm.content"
				/>
			</el-form-item>
			<el-form-item>
				<el-button 
					type="primary" 
					@click="submitForm()"
			    >更新职位</el-button>
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
	const jobFormRef = ref()
	const jobForm = reactive({
		name: '',
		category: 1,	//1 开发 2 运营 3 管理
		location: '',
		description: '',
		content: '',
	})
	
	const jobFormRules = reactive({
		name:[
			{required: true,message: '请输入职位名称',trigger: 'blur'}
		],
		category:[
			{required: true,message: '请输入职位分类',trigger: 'blur'}
		],
		location:[
			{required: true,message: '请选输入所在城市',trigger: 'blur'}
		],
		description:[
			{required: true,message: '请输入职位描述',trigger: 'blur'}
		],
		content:[
			{required: true,message: '请输入职位内容',trigger: 'blur'}
		]
	})
	
	//每次editor内容改变的回调
	const handleChange = (data)=>{
		// console.log(data)
		jobForm.content = data
	}
	
	//新闻类别列表
	const options = [
		{
			label: '研发',
			value: 1
		},
		{
			label: '运营',
			value: 2
		},
		{
			label: '管理',
			value: 3
		}
	]
	
	//校验更新职位信息
	const submitForm = ()=>{
		jobFormRef.value.validate(async (valid)=>{
			if(valid) {
				// console.log(jobForm,'更新了的数据')
				//后台通信更新新闻
				await axios.post('/adminapi/job/list',jobForm)
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
		const res = await axios.get(`/adminapi/job/list/${route.params.id}`)
		
		// console.log(res.data.data[0])
		Object.assign(jobForm,res.data.data[0])
	})
</script>

<style lang="scss" scoped>
	.el-form {
		margin-top: 50px;
	}
</style>