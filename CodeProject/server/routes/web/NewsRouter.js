var express = require('express');
const NewsController = require('../../controllers/web/NewsController.js')
var NewsRouter = express.Router();

//涉及文件上传，普通post不行，必须用multer中间件
NewsRouter.get('/webapi/news/list',NewsController.getList)
NewsRouter.get('/webapi/news/list/:id',NewsController.getList)
NewsRouter.get('/webapi/news/toplist',NewsController.getTopList)

module.exports = NewsRouter;