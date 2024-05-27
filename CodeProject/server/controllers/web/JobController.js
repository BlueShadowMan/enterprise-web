const JobService = require("../../services/web/JobService")

const JobController = {
	getList: async (req,res)=>{
		const result = await JobService.getList({_id:req.params.id})
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	
	// getTopList: async (req,res)=>{
	// 	const result = await JobService.getTopList({limit:req.query.limit})
	// 	res.send({
	// 		ActionType: 'OK',
	// 		data: result
	// 	})
	// }
	
}

module.exports = JobController