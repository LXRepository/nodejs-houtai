 
function prodition() {
   this.loadHeader();
/*   this.creattables();*/
   this.addproEvent();
	this.check();
  
}

$.extend(prodition.prototype, {

    check:function(){
    	$.get("/api/users/check",(data)=>{
    		if (data.res_code === -1) {
    			location = "/index.html";
    		}else
    			 this.listbypage(1);
    			$("#link_to").removeAttr("href");
    		
    	},"json")
    },

	loadHeader : function() {
		new header();
		$("#position-nav ul:first li:last").addClass("active").siblings().removeClass("active");
	},

	addproEvent:function(){
		
		$(".btn_add").on("click", $.proxy(this.addproHandler, this));
		//点击页码查询
			const that = this;
		$(".pagination").on("click","li",function(){
			//获得当前点击的页码
			$(this).addClass("active")
			$(this).siblings().removeClass("active")
			const currentPage =  $(this).find("a").text()
			//利用listbypage（）查询
			that.listbypage(currentPage);
		});
		
	},
	addproHandler:function(){
		//创建formdata对象，类比serverlize序列化拥有name属性的值
		var formData = new FormData($(".add_pos_form").get(0));
        //使用jquery中的get()方法获得下标的元素


		// 利用ajax向服务器传递数据，包括图像资源
		$.ajax({
			type:"post",//上传资源必须使用post请求！
			url:"/api/addpro/addpro",
		    data:formData,//向服务器传递的数据
		  //由于ajax默认情况下会将数据对象转化成查询字符串，因此如下
		    processData:false,//不需要将data转化为查询字符串
		    contentType:false,//不设置请求头信息的转化
		    dataType:"json",
		    success : function(data) {
				if (data.res_code === 0) { // 成功
					$("#addmyModal").modal("hide");
					location.reload();
				} else { // 失败
					$(".add_pos_error").removeClass("hide");
				}
			}
		});
		$.get("/api/users/check",(data)=>{
    		if (data.res_code === -1) {
    			location = "/index.html";
    		}else
    			 this.listbypage(1);
    			$("#link_to").removeAttr("href");
    		
    	},"json")




		/*$.post("/api/addpro/addpro", $(".add_pos_form").serialize(),  function(data){
			if (data.res_code === 0) { // 成功
					$("#addPosModal").modal("hide");
				} else { // 失败
					$(".add_pos_error").removeClass("hide");
				}
		},"json");*/
	},


	listbypage:function(currentPage){
		currentPage = currentPage || 1;//如果没有页码默认第一页
		$.get("/api/addpro/list",{pageIndex:currentPage},(data)=>{
			if (data.res_code===0) {
				//利用末班引擎
				const html = template("prodition_list_temp",{list:data.res_body})
				$(".pos_table tbody").html(html);
				$(".delte_tab").on("click","a", this.handledlete);//点击删除按钮触发handledlete
				$(".revise_tab").on("click","a", function(){
					var updid = $(this).parent().siblings(".pos_id").text();
                    //将tr的ID动态传给模态框input的name为id的value值
					$(".modelid").val(updid);
				});
				$(".upd_btn").on("click",this.handleupdate);
                //点击提交按钮后触发handleupdate函数
			}
		},"json");
	},
	handledlete:function(){
		var thisid = $(this).parent().siblings(".pos_id").text();//找到被点击的tr的id
		$.get("/api/addpro/deletes",{deleteid:thisid},(data)=>{
    		if (data.res_code === 0) {
		        $(this).parents("tr").remove();
    		}else
    			console.log("找不到信息！")
    		
    	},"json")


	},
	handleupdate:function(){
//创建formdata对象，类比serverlize序列化拥有name属性的值
		var formDatas = new FormData($(".update_pos_form").get(0));
 //使用jquery中的get()方法获得下标的元素		
		$.ajax({
			type:"post",
			url:"/api/addpro/updates",
		    data:formData,//向服务器传递的数据
          //由于ajax默认情况下会将数据对象转化成查询字符串，因此如下
            processData:false,//不需要将data转化为查询字符串
            contentType:false,//不设置请求头信息的转化
		    dataType:"json",
		    success : function(data) {
				if (data.res_code === 0) { 
					$("#addmyModal").modal("hide");
					
					location.reload();
				} else { 
					$(".add_pos_error").removeClass("hide");
				}
			}
		});
	},
});
new prodition();

