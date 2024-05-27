var express = require('express');
const ProductController = require('../../controllers/web/ProductController.js')
var ProductRouter = express.Router();

//涉及文件上传，普通post不行，必须用multer中间件
ProductRouter.get('/webapi/product/list',ProductController.getList)

module.exports = ProductRouter;