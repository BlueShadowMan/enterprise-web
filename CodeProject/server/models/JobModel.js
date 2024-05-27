const mongoose = require('mongoose')
const Schema = mongoose.Schema
//job模型===>jobs集合

const JobType = {
	name: String,
	category: Number,		//类别，1，2，3
	location: String,
	description: String,
	content: String,
	editTime: Date	//编辑时间
}
const JobModel = mongoose.model('jobs',new Schema(JobType))

module.exports = JobModel