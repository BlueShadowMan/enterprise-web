<template>
	<div>
		<el-page-header
			content="职位管理" 
			icon="" 
			title="创建职位" 
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
				prop="content"
			>
				<Editor @event="handleChange"/>
			</el-form-item>
			<el-form-item>
				<el-button 
					type="primary" 
					@click="submitForm()"
			    >添加职位</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
	import {ref,reactive} from 'vue'
	import { useRouter } from 'vue-router';
	import Editor from '@/components/editor/Editor'
	import upload from '@/util/upload'
	import Upload from '@/components/upload/Upload'
	import axios from 'axios';
	
	const router = useRouter()
	
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
	
	//职位类别列表
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
	
	//校验提交创建职位
	const submitForm = ()=>{
		jobFormRef.value.validate(async (valid)=>{
			if(valid) {
				// console.log(jobForm)
				//后台通信
				const res = await axios.post('/adminapi/job/add',jobForm)
				// console.log(res.data)
				router.push(`/job-manage/joblist`)
			}
		})
	}
</script>

<style lang="scss" scoped>
	.el-form {
		margin-top: 50px;
	}
</style>