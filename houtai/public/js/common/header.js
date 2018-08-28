function header() {
	this.creatDom();
	this.creatlogin();
	this.creatreg();
	this.checklogin();
	this.addlistener();
}
header.template = `<nav class="navbar navbar-inverse"">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">职位管理系统</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="position-nav">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">首页</a></li>
					<li><a  href="#profile" aria-controls="profile" role="tab" data-toggle="tab">职位管理</a></li>
					<li><a  id="link_to">职位管理</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li data-toggle="modal" data-target="#resmyModal"><a href="#">登录</a></li>
					<li data-toggle="modal" data-target="#myModal"><a href="#">注册</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right hide login_success">
					<li><a href="#">欢迎您..</a></li>
					<li class="logout_link"><a href="#">退出</a></li>
				</ul>
			</div>

		</div>
	</nav>`;

$.extend(header.prototype,{

	creatDom:function(){
		$(header.template).appendTo(".header");
	},
	creatlogin:function(){
		new loginmodel();
	},
	creatreg:function(){
		new register();
	},
	addlistener:function(){
		$(".logout_link").on("click",this.handlelogout);
	},
	handlelogout:function(){
		$.get("/api/users/logout",function(){
			location.reload();
		})

	},
	checklogin:function(){
		$.get("/api/users/check",function(data){
			if (data.res_code === 0) {
				$(".login_success").removeClass("hide").prev("ul").hide();
				$(".login_success a:first").text("欢迎您:"+data.res_body.username);
			}
		},"json")

	}
})
