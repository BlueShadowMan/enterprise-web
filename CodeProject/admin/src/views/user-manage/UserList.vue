<template>
	<div>
		<el-card>
			<el-page-header
				content="用户列表" 
				icon="" 
				title="用户管理" 
			/>
			<el-table 
				:data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
				style="width: 100%"
			>
			    <el-table-column 
					prop="username" 
					label="用户名" 
					width="180" 
				/>
			    <el-table-column 
					label="头像" 
					width="180" 
				>
					<template #default="scope">
						<div v-if="scope.row.avatar">
							<el-avatar 
								:size="50" 
								:src="'http://localhost:3000/'+scope.row.avatar"
							>
							</el-avatar>
						</div>
						<div v-else>
							<el-avatar :size="50" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
						</div>
					</template>
				</el-table-column>
				<el-table-column
					label="角色" 
					width="180" 
				>
					<template #default="scope">
						<!-- {{scope.row.role===1?'管理员':'编辑'}} -->
						<el-tag 
							v-if="scope.row.role===1"
							class="ml-2" 
							type="danger"
						>管理员</el-tag>
						<el-tag 
							v-else
							class="ml-2" 
							type="success"
						>编辑</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作">
				    <template #default="scope">
						<el-button 
							size="small" 
							@click="handleEdit(scope.row)"
						>
				        编辑
				        </el-button>
						<el-popconfirm 
							title="你确定要删除吗？"
							confirm-button-text="确定"
							cancel-button-text="取消"
							@confirm="handleDelete(scope.row)"
						>
							<template #reference>
								<el-button
									size="small"
									type="danger"
								>
								删除
								</el-button>
							</template>
						</el-popconfirm>
				    </template>
				    </el-table-column>
			</el-table>
			<!-- 分页相关 -->
			<el-pagination
			   @size-change="handleSizeChange" 
			   @current-change="handleCurrentChange"
			   :current-page="currentPage" 
			   :page-sizes="[5,10,20]" 
			   :page-size="pageSize" 
			   layout="total, sizes, prev, pager, next, jumper" 
			   :total="tableData.length"
			   class="page"
			>
			</el-pagination>
		</el-card>
		
		<el-dialog
		    v-model="dialogVisible"
		    title="编辑用户"
		    width="50%"
		>
		    <el-form
		        ref="userFormRef"
		        :model="userForm"
		        :rules="userFormRules"
		        label-width="80px"
		        class="demo-ruleForm"
		    >
		        <el-form-item 
		    		label="用户名" 
		    		prop="username"
		    	>
		    		<el-input v-model="userForm.username" />
		        </el-form-item>
		    	<el-form-item
		    		label="密码" 
		    		prop="password"
		    	>
		    		<el-input v-model="userForm.password" type="password"/>
		    	</el-form-item>
		    	<el-form-item
		    		label="角色" 
		    		prop="role"
		    	>
		    		<el-select
		    		    v-model="userForm.role"
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
		    		label="个人简介" 
		    		prop="introduction"
		    	>
		    		<el-input v-model="userForm.introduction" 
		    		type="textarea"/>
		    	</el-form-item>
		    </el-form>
		    <template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button 
						type="primary" 
						@click="handleEditConfirm()">
					确认
					</el-button>
				</div>
		    </template>
		</el-dialog>
	</div>
</template>

<script setup>
	import {ref,onMounted,reactive} from 'vue'
	import axios from 'axios';
	
	const tableData = ref([])
	const dialogVisible = ref(false)
	
	//表单引用对象
	const userFormRef = ref()
	
	//表单信息对象
	let userForm = reactive({
		username: '',
		password: '',
		role: 2,	//1是管理员，2是编辑
		introduction: ''
	})
	
	//表单校验规则
	const userFormRules = reactive({
		username: [
			{ required: true, message: '请输入名字', trigger: 'blur' },
		],
		password: [
			{ required: true, message: '请输入密码', trigger: 'blur' },
		],
		role: [
			{ required: true, message: '请选择权限', trigger: 'blur' },
		],
		introduction: [
			{ required: true, message: '请输入介绍', trigger: 'blur' },
		]
	})
	
	//定义角色列表
	const options = [{
		label: '管理员',
		value: 1
	},{
		label: '编辑',
		value: 2
	},]
	
	//渲染页面时向后端取列表数据
	onMounted(()=>{
		getTableData()
	})
	
	const getTableData = async ()=>{
		const res = await axios.get('adminapi/user/list')
		// console.log(res.data)
		tableData.value = res.data.data
	}
	
	//编辑按钮回调
	const handleEdit = async (data)=>{
		// console.log(data)
		// userForm
		const res = await axios.get(`adminapi/user/list/${data._id}`)
		console.log(res.data.data)
		// userForm.value = res.data.data[0]
		Object.assign(userForm,res.data.data[0])
		dialogVisible.value = true
	}
	
	//编辑确认回调
	const handleEditConfirm = ()=>{
		userFormRef.value.validate(async (valid)=>{
			if(valid) {
				// console.log(userForm)
				//1- 更新后端
				await axios.put(`/adminapi/user/list/${userForm._id}`,userForm)
				//2- dialog隐藏
				dialogVisible.value = false
				//3- 获取table数据
				getTableData()
			}
		})
	}
	
	//删除按钮
	const handleDelete = async (data)=>{
		// console.log(data)
		await axios.delete(`/adminapi/user/list/${data._id}`)
		//reload page
		//reload data
		getTableData()
		//tabledata 本地删除
	}
	
	//分页相关
	const pageSize = ref(5)
	const total = ref(20)
	const currentPage = ref(1)
	//改变每页有多少条的回调
	const handleSizeChange = (size)=>{
		pageSize.value = size
		console.log(pageSize.value)
	}
	//改变当前页面的回调
	const handleCurrentChange = (page)=> {
		currentPage.value = page
		console.log(currentPage.value)
	}
</script>

<style lang="scss" scoped>
	.el-table {
		margin-top: 50px;
	}
	
	.el-card {
		dispaly:flex; 
	}
	
	.page {
		margin-top: 20px;
		align-items: center;
		justify-content: center;
	}
</style>