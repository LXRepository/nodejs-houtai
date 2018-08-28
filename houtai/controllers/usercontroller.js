



const usermodel = require("../models/usermodel")//为使用model文件中的数据模块，用require将其引入


  function checklogin(req,res,next){
    //判断用户是否登陆
    var user = req.session.loginUser;
    if(user){
        res.json({
            res_code:0,
            res_msg:"",
            res_body:{
                username:user
            }
        })
    }
    else{
         res.json({
            res_code:-1,
            res_msg:"用户登录失效",
            res_body:{}
        })
    }
  };

//注册
function register(req, res ,next) {
//	res.send("lalala");
//req.body存放post请求主体的key-value键值对
    const{username,password,email} = req.body;//将请求主体中用户名，密码，邮箱解构赋值到变量中
    usermodel.save({username,password,email}, 
    (data)=>{//调用用户模型的方法来保存接收到的数据
        res.json({
        	res_code:0,
        	res_msg:"success",
        	res_body:data
        });
    },(err)=>{
    	 res.json({
    	 	res_code:-1,
    	 	res_msg:err,
    	 	res_body:{}
    	 });
    });
}

 function login(req,res,next){
    const{username, password} = req.body;
    //验证登录成功失败
    usermodel.find({username, password},(data)=>{
       
        if (data.length === 1) {//如果数据库中存在此数据，则登陆成功

        //在session中记录登陆成功的用户名
        req.session.loginUser = data[0].username;

         res.json({
            res_code:0,
            res_msg:"",
            res_body:{username:data[0].username,email:data[0].email}
         });
         
        }else{//存在用户数据但密码或用户名错误
            res.json({
            res_code:-2,
            res_msg:"用户名或密码错误",
            res_body:{}
         });

        }
    },(err)=>{//没有用户数据，即未注册
        res.json({
            res_code:-1,
            res_msg:err,
            res_body:{}
         });

    });

 };
 //用户退出
 function logout(req,res,next){
    req.session = null;
    res.json({
        res_code:0,
        res_error:"",
        res_body:{}
    })

 }

module.exports = {register, login, checklogin, logout};//将其放出去让其他文件可以引用。
