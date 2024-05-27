var express = require('express');
const JobController = require('../../controllers/admin/JobController.js')
var JobRouter = express.Router();

JobRouter.post('/adminapi/job/add',JobController.add)
JobRouter.get('/adminapi/job/list',JobController.getList)
JobRouter.post('/adminapi/job/list',JobController.updateList)
JobRouter.get('/adminapi/job/list/:id',JobController.getList)
JobRouter.delete('/adminapi/job/list/:id',JobController.delList)
// NewsRouter.put('/adminapi/news/publish',NewsController.publish)

module.exports = JobRouter;