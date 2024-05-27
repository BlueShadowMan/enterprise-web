const JobService = require("../../services/admin/JobService")

const JobController = {
	add: async (req,res)=> {
		// console.log(req.body)
		const {name,category,location,description,content} = req.body
		//调用service进行添加
		await JobService.add({
			name,
			category: Number(category),
			location,
			description,
			content,
			editTime: new Date()
		})
		res.send({
			ActionType: 'OK'
		})
	},
	
	updateList: async (req,res)=> {
		// console.log(req.file,req.body)
		const {name,category,location,description,content,_id} = req.body
		//调用service进行添加
		await JobService.updateList({
			_id,
			name,
			category: Number(category),
			location,
			description,
			content,
			editTime: new Date()
		})
		res.send({
			ActionType: 'OK'
		})
	},
	
	getList: async (req,res)=>{
		const result = await JobService.getList({_id:req.params.id})
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	
	delList: async (req,res)=>{
		await JobService.delList({_id: req.params.id})
		res.send({
			ActionType: 'OK',
		})
	},
	
}

module.exports = JobController