function register() {
	this.createDom();
	this.regEventListen();
	
}

register.template = `<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">用户注册</h4>
      </div>
      <div class="modal-body">
        <form id="reg-form">
			<div class="form-group">
				<label for="exampleInputEmail1">用户名</label>
				<input type="text" class="form-control form-username" name="username" id="exampleInputEmail1 form-username" placeholder="输入用户名">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">密码</label>
				<input type="password" class="form-control form-password" name="password" id="exampleInputPassword1 form-password" placeholder="输入密码">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">确认密码</label>
				<input type="password" class="form-control form-rightpass" id="exampleInputPassword1 form-rightpass" placeholder="再次输入密码">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">邮箱</label>
				<input type="email" class="form-control form-email" name="email" id="exampleInputPassword1 form-email" placeholder="输入Email地址">
			</div>
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-reg">注册</button>
      </div>
    </div>
  </div>
</div>`;

$.extend(register.prototype,{

	createDom:function(){
		$(register.template).appendTo("body");
	},
	regEventListen:function () {
		$(".btn-reg").on("click", $.proxy(this.regHandler, this));
		//此处this.element找到的是整个被引入的template模块
	},//此处click后绑定的函数不写在内部而是在下面重新构造一个！
	regHandler:function () {//此处使用this容易引发this的指向问题，因此在click内部使用$.proxy操作！
		$.post("/api/users/register", $("#reg-form").serialize(),  function(data){
			if (data.res_code === 0) { // 成功
				console.log(data)
			} else {
				console.log("shibai")
			}
		},"json");
	}
})