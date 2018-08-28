function loginmodel() {
	this.createDom();
  this.addlistener();
}

loginmodel.template = `<div class="modal fade" id="resmyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">用户登录</h4>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger hide login_error" role="alert">用户登录失败，用户名或密码错误...</div>
        <form class="login-form">
			<div class="form-group">
				<label for="exampleInputEmail1">用户名</label>
				<input type="email" class="form-control form-username" name="username" id="exampleInputEmail1" placeholder="输入用户名">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">密码</label>
				<input type="password" class="form-control form-password" name="password" id="exampleInputPassword1" placeholder="输入密码">
			</div>
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn_login">登录</button>
        </div>
        </div>
        </div>
        </div>`;

        $.extend(loginmodel.prototype,{

         createDom:function(){
          $(loginmodel.template).appendTo("body");
        },

         addlistener:function(){
          $(".btn_login").on("click",this.handleLogin);
        },

         handleLogin:function(){
          $.post("/api/users/login",$(".login-form").serialize(),function(data){

           if (data.res_code === 0) {
             $(".login_success").removeClass("hide").prev("ul").hide();
             $(".login_success a:first").text("欢迎您.."+data.res_body.username)
             $("#resmyModal").modal("hide")
             location.reload();
           }
           else{
            $(".login_error").removeClass("hide")

          }
        },"json")
        }
      })