


const mongoose = require("../utils/db");//引入数据库链接模块 

const addproSchema = mongoose.Schema({//指明要保存的数据，创建结构
	position:String,
	company:String,
	salary:Number,
	logo:String
});
//集合名会默认在model()方法第一个参数后加s
const addpro = mongoose.model("prodition", addproSchema);//根据结构创建集合（数据表）,返回的是构造函数

//保存用户数据
function save(positionuserinfo ,success, error) {

	new addpro(positionuserinfo).save().then(success,error);
	//此处的save是mongoose自己的save方法，返回的是promise对象，
	//promise对象有then(err,succerss的结果)方法
	/*console.log(userinfo);
	if (userinfo.username === "admin") {
		success(userinfo);
	}
	else{
		error("信息保存失败")
	}*/
	
}
//按页查询用户数据
function findByPage(pageIndex,success,error) {
	const pagesize = 5;//pagesize中保存每页显示的文档数量

	addpro.find().limit(pagesize).skip((pageIndex-1)*pagesize).then(success,error);
	//从数据库中find()查找到跳过pageindex-1*pagesize条文档数据，限定查询pagesize条文档数据
	
}
function finddelet(deletid,success,error){
	addpro.remove({"_id":deletid}).then(success,error)
//删除存在ID为deletid的数据返回
}

function findupdate(updateuserinfo,success,error){
	console.log(updateuserinfo)
	addpro.update({"_id":updateuserinfo._id},{ $set: updateuserinfo }).then(success,error);

}

module.exports = {save, findByPage, finddelet, findupdate}