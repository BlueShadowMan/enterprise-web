<template>
	<div>
		<el-card>
			<el-page-header
				content="职位列表" 
				icon="" 
				title="职位管理" 
			/>
			<!-- 筛选搜索 -->
			<div style="float: right">
				<el-input v-model="keyword" style="width: 240px" placeholder="请输入关键词" />
				<el-select
				      v-model="selectedCategory"
				      placeholder="请选择"
				      size="default"
				      style="width: 240px; margin-right: 10px;"
				>
				      <el-option
				        v-for="item in options"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"
				      />
				</el-select>
				<el-button @click="handleSearch">搜索</el-button>
				<el-button @click="handleReset" style="margin-left: 0;">重置</el-button>
			</div>
			<!-- 表格主体 -->
			<el-table
				:data="filterList.slice((currentPage-1)*pageSize,currentPage*pageSize)" 
				style="width: 100%"
			>
			    <el-table-column 
					prop="name" 
					label="职位名称" 
					width="180" 
				/>
				<el-table-column
					prop="category" 
					label="分类" 
				>
					<template #default="scope">
						{{categoryFormat(scope.row.category)}}
					</template>
				</el-table-column>
				<el-table-column
					prop="location" 
					label="所在城市" 
					width="180" 
				/>
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
							:icon="View"
							type="success"
							@click="handlePreview(scope.row)"
						></el-button>
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
		<el-dialog
		    v-model="dialogVisible"
		    title="预览职位"
		    width="50%"
		>
			<div>
				<h2>职位名称：{{previewData.name}}</h2>
				<div>所在城市：{{previewData.location}}</div>
				<div style="font-size: 12px;color: gray;">
					发布时间：{{formatTime.getTime(previewData.editTime)}}
				</div>
				<el-divider>
					<el-icon><star-filled/></el-icon>
				</el-divider>
				<div style="padding-bottom: 10px;">
					<h3>职位描述：</h3>
					<div>
						{{previewData.description}}
					</div>
				</div>
				<div style="padding-bottom: 5px;">
					<h3>职位内容:</h3>
					<div
						v-html="previewData.content" 
						class="htmlcontent"
					>
					</div>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script setup>
	import axios from 'axios';
	import { ref,onMounted } from 'vue';
	import formatTime from '@/util/formatTime'
	import {Star,Edit,Delete,View,StarFilled} from '@element-plus/icons-vue'
	import { useRouter } from 'vue-router';
	
	const router = useRouter()
	const tableData = ref([])
	const previewData = ref({})
	const dialogVisible = ref(false)
	
	//页面加载时获取列表信息
	onMounted(()=>{
		getTableData()
	})
	
	//从后端请求拿取列表信息赋值tableData
	const getTableData = async ()=>{
		const res = await axios.get(`/adminapi/job/list`)
		// console.log(res.data.data,'列表更新了一次')
		tableData.value = res.data.data
		//筛选列表的数据
		filterList.value = tableData.value
		
		if(searched.value){
			handleSearch()
		}
	}
	
	//格式化分类信息
	const categoryFormat = (category)=>{
		const arr = ['研发','运营','管理']
		return arr[category-1]
	}
	
	//预览回调
	const handlePreview = (data)=>{
		// console.log(data)
		previewData.value = data
		dialogVisible.value = true
	}
	
	//删除回调
	const handleDelete = async (item)=>{
		// console.log(item._id)
		await axios.delete(`/adminapi/job/list/${item._id}`)
		await getTableData()
	}
	
	//编辑回调
	const handleEdit = async (item)=>{
		//跳转到news-manage/editnews/:id
		router.push(`/job-manage/editjob/${item._id}`)
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
	
	const keyword = ref('')
	const selectedCategory = ref()
	const filterList = ref([])
	const searched = ref(false)
	//搜索功能
	const handleSearch = ()=>{
		searched.value = true
		filterList.value = tableData.value.filter((item)=>{
			if(selectedCategory.value) {
				return item.name.includes(keyword.value)&&item.category===selectedCategory.value
			}else {
				return item.name.includes(keyword.value)
			}
		})
	}
	//搜索重置
	const handleReset = ()=>{
		searched.value=false
		keyword.value = ''
		selectedCategory.value = null
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