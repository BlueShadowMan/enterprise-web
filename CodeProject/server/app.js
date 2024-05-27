var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//项目路由配置
const UserRouter = require('./routes/admin/UserRouter.js')
var JWT = require('./util/JWT.js');
const NewsRouter = require('./routes/admin/NewsRouter.js');
const JobRouter = require('./routes/admin/JobRouter.js')
const WebJobRouter = require('./routes/web/JobRouter.js');
const WebNewsRouter = require('./routes/web/NewsRouter.js');
const ProductRouter = require('./routes/admin/ProductRouter.js');
const WebProductRouter = require('./routes/web/ProductRouter.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',indexRouter)
app.use('/users',usersRouter)

//前台页面webapi
app.use(WebNewsRouter)
app.use(WebProductRouter)
app.use(WebJobRouter)
/*
adminapi - 后台系统用的
webapi - 企业官网用的
*/
app.use((req,res,next)=>{
	//如果token有效，next()
	//如果token过期了，返回401错误
	if(req.url === '/adminapi/user/login') {
		// console.log('首次登录')
		next()
		return
	}
	
	const token = req.headers['authorization'].split(' ')[1]
	if(token) {
		// console.log('验证token')
		var payload = JWT.verify(token)
		console.log(payload)
		if(payload) {
			const newToken = JWT.generator({
				_id: payload._id,
				username: payload.username
			},'1d')
			res.header('Authorization',newToken)
			next()
		}else {
			res.status(401).send({errCode: '-1',errorInfo: 'token过期'})
		}
	}
})

//使用路由
app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)
app.use(JobRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
