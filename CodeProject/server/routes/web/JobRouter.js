var express = require('express');
const JobController = require('../../controllers/web/JobController.js')
var JobRouter = express.Router();

JobRouter.get('/webapi/job/list',JobController.getList)
JobRouter.get('/webapi/job/list/:id',JobController.getList)
// JobRouter.get('/webapi/news/toplist',JobController.getTopList)

module.exports = JobRouter;