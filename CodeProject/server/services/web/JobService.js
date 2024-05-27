const JobModel = require("../../models/JobModel")

const JobService = {
	getList: async ({_id})=> {
		return _id?JobModel.find({_id}):JobModel.find({}).sort({editTime:-1})
	},
	
	// getTopList: async ({limit})=> {
	// 	return JobModel.find({}).sort({editTime:-1}).limit(limit)
	// }
}

module.exports = JobService