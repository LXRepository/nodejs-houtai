var express = require('express');
var router = express.Router();

const addcontroller = require("../controllers/addcontroller");

//配置文件上传
var multer = require('multer');

var storage = multer.diskStorage({
//配置磁盘存储目标
  destination: function (req, file, cb) {
    cb(null, './public/upload')//将上传的文件保存到public中自定义的文件中
  },
//配置保存文件的文件名规则
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf(".")))
  }//originalname为用户上传是的文件本机名，需要加截取的文件类型的后缀
})
 
var upload = multer({ storage: storage })

/* GET users listing. */
router.post('/addpro',upload.single("logo"), addcontroller.addpro);
//single()接受具有名称的单个文件fieldname，名称可以使用name属性的值！

//路由，查询职位
router.get("/list", addcontroller.list);//get()请求获取到查询的列表

//删除数据
router.get("/deletes", addcontroller.deletes);//get()请求获取到查询的列表

//修改数据
router.post("/updates", upload.single("logo"), addcontroller.updates);//get()请求获取到查询的列表

module.exports = router;
