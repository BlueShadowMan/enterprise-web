const JobModel = require("../../models/JobModel")

const JobService = {
	add: async ({name,category,location,description,content,editTime})=>{
		return JobModel.create({
			name,category,location,description,content,editTime
		})
	},
	
	updateList: async ({_id,name,category,location,description,content,editTime})=>{
		return JobModel.updateOne({_id},{
			name,category,location,description,content,editTime
		})
	},
	
	getList: async ({_id})=> {
		return _id?JobModel.find({_id}):JobModel.find({})
	},
	
	delList: async ({_id})=>{
		return JobModel.deleteOne({
			_id
		})
	},
	
	// publish: async ({_id,isPublish,editTime})=> {
	// 	return NewsModel.updateOne({
	// 		_id
	// 	},{
	// 		isPublish,
	// 		editTime
	// 	})
	// },
	
}

module.exports = JobService