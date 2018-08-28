



const addmodel = require("../models/addmodel")//为使用model文件中的数据模块，用require将其引入
//注册
function addpro(req, res ,next) {
//res.send("lalala");
//req.body存放post请求主体的key-value键值对
    const{position,company,salary} = req.body;//将请求主体中用户名，密码，邮箱解构赋值到变量中
    
    let logo="";
    if (req.file) //如果有上传的文件
        logo="/upload/"+req.file.filename;
   

    addmodel.save({position,company,salary,logo}, 
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

};

function list(req, res, next){
    //从请求中获取页码
    const {pageIndex} = req.query;
    //按页查询
    addmodel.findByPage(pageIndex,(data)=>{//放置查询成功返回的结果
        res.json({
            res_code:0,
            res_msg:"success",
            res_body:data
        })
    },(err)=>{
        res.json({
            res_code:-1,
            res_msg:err,
            res_body:{}
        })

    });

};

function deletes(req, res, next){
//从前端请求js页面中获取ID
    const{deleteid} = req.query;

    addmodel.finddelet(deleteid,(data)=>{
         res.json({
            res_code:0,
            res_msg:"success",
            res_body:data
        })
     },(err)=>{
        res.json({
            res_code:-1,
            res_msg:err,
            res_body:{}
        })
     })
};

function updates(req, res, next){
    const{position,company,salary,_id} = req.body;
  
    let logo="";
    if (req.file) 
        logo="/upload/"+req.file.filename;
   

    addmodel.findupdate({position,company,salary,_id,logo},
    (data)=>{
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
};



module.exports = {addpro, list, deletes, updates};//将其放出去让其他文件可以引用。