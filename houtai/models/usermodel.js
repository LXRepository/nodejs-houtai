


const mongoose = require("../utils/db");//引入数据库链接模块 

const userSchema = mongoose.Schema({//指明要保存的数据，创建结构
	username:String,
	password:String,
	email:String
});
//集合名会默认在model()方法第一个参数后加s
const User = mongoose.model("user", userSchema);//根据结构创建集合（数据表）,返回的是构造函数

//保存用户数据
function save(userinfo ,success, error) {

	new User(userinfo).save().then(success,error);
	//此处的save是mongoose自己的save方法，返回的是promise对象，
	//promise对象有then(err,succerss的结果)方法
	/*console.log(userinfo);
	if (userinfo.username === "admin") {
		success(userinfo);
	}
	else{
		error("信息保存失败")
	}*/
	
};
//查询用户数据
function find(userinfo,success,error) {

	User.find(userinfo).then(success,error)
}

module.exports = {save, find}