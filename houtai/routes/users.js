var express = require('express');
var router = express.Router();

const usercontroller = require("../controllers/usercontroller");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 用户是否登录路由
router.get("/check", usercontroller.checklogin);

//用户登录路由
router.post("/login",usercontroller.login);

//用户退出路由
router.get("/logout", usercontroller.logout);
//用户注册路由，使用控制器中register方法
router.post('/register',usercontroller.register);

//get()请求数据检查是否有相同用户


module.exports = router;
