var express = require('express');
const UserController = require('../../controllers/admin/UserController.js')
var UserRouter = express.Router();
//图片上传模块
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

//用户登录，和个人中心页面的信息显示和添加
UserRouter.post('/adminapi/user/login',UserController.login)
UserRouter.post('/adminapi/user/upload',upload.single('file'),UserController.upload)

//用户管理模块，添加用户
UserRouter.post('/adminapi/user/add',upload.single('file'),UserController.add)
//实现用户列表的增删改查
//用户管理模块，获取全部用户列表
UserRouter.get('/adminapi/user/list',UserController.getList)
//用户管理模块，用户列表，对于单个成员编辑时，获取单个用户数据
UserRouter.get('/adminapi/user/list/:id',UserController.getList)
//用户管理模块，更新用户信息
UserRouter.put('/adminapi/user/list/:id',UserController.putList)
//用户管理模块，删除单个用户
UserRouter.delete('/adminapi/user/list/:id',UserController.delList)

module.exports = UserRouter;
