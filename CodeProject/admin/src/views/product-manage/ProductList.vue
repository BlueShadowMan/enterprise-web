<template>
	<div>
		<el-card>
			<el-page-header
				content="产品列表" 
				icon="" 
				title="产品管理" 
			/>
			<!-- 筛选搜索 -->
			<div style="float: right">
				<el-input v-model="keyword" style="width: 240px" placeholder="请输入关键词" />
				<el-button @click="handleSearch">搜索</el-button>
				<el-button @click="handleReset" style="margin-left: 0;">重置</el-button>
			</div>
			<!-- 表格主体 -->
			<el-table
				:data="filterList.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
				style="width: 100%"
			>
			    <el-table-column 
					prop="title" 
					label="产品名称" 
					width="180" 
				/>
				<el-table-column
					prop="introduction" 
					label="简要描述" 
				>
				</el-table-column>
				<el-table-column
					label="更新时间" 
				>
					<template #default="scope">
						{{formatTime.getTime(scope.row.editTime)}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
				    <template #default="scope">
						<el-button
							circle
							:icon="Edit"
							@click="handleEdit(scope.row)"
						></el-button>
						<el-popconfirm
							title="你确定要删除吗？"
							confirm-button-text="确定"
							cancel-button-text="取消"
							@confirm="handleDelete(scope.row)"
						>
							<template #reference>
								<el-button
									circle
									:icon="Delete"
									type="danger"
								></el-button>
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
			   :total="filterList.length"
			   class="page"
			>
			</el-pagination>
		</el-card>
	</div>
</template>

<script setup>
	import axios from 'axios';
	import { ref,onMounted } from 'vue';
	import formatTime from '@/util/formatTime'
	import {Edit,Delete} from '@element-plus/icons-vue'
	import { useRouter } from 'vue-router';
	
	const router = useRouter()
	const tableData = ref([])
	
	//页面加载时获取列表信息
	onMounted(()=>{
		getTableData()
	})
	
	//从后端请求拿取列表信息赋值tableData
	const getTableData = async ()=>{
		const res = await axios.get(`/adminapi/product/list`)
		// console.log(res.data.data,'列表更新了一次')
		tableData.value = res.data.data
		//筛选后的列表
		filterList.value = tableData.value
		
		if(searched.value){
			handleSearch()
		}
	}
	
	//删除回调
	const handleDelete = async (item)=>{
		// console.log(item._id)
		await axios.delete(`/adminapi/product/list/${item._id}`)
		await getTableData()
	}
	
	//编辑回调
	const handleEdit = async (item)=>{
		//跳转到/product-manage/editproduct/:id
		router.push(`/product-manage/editproduct/${item._id}`)
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
	
	//搜索功能
	const keyword = ref('')
	const filterList = ref([])
	const searched = ref(false)
	//搜索功能回调
	const handleSearch = ()=>{
		searched.value = true
		filterList.value = tableData.value.filter((item)=>{
			return item.title.includes(keyword.value)
		})
	}
	//搜索重置
	const handleReset = ()=>{
		searched.value = false
		keyword.value = ''
		filterList.value = tableData.value
	}
</script>

<style lang="scss" scoped>
	.el-table {
		margin-top: 50px;
	}
	
	::v-deep .htmlcontent {
		img {
			max-width: 100%;
		}
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