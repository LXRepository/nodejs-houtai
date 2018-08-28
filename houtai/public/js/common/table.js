 
function prodition() {
  this.creatDom();
/*   this.creattables();*/
   this.addproEvent();
   this.listbypage(1);
}

prodition.template = `<div role="tabpanel" class="tab-pane active" id="home">222</div>
<div role="tabpanel" class="tab-pane table-responsive" id="profile" style="padding: 0 50px;">
<div class="addpro">
<span>职位管理</span>
<button type="button" class="btn btn-primary btn-add" data-toggle="modal" data-target="#addmyModal">添加</button>
</div>
<table class="table table-bordered pos_table" style="margin-bottom:0px">
<thead>
<tr>
<td>序号</td>
<td>公司logo</td>
<td>职位名称</td>
<td>公司名称</td>
<td>工作经验</td>
<td>职位类型</td>
<td>工作地点</td>
<td>职位薪资</td>
<td colspan="2">操作</td>
</tr>
</thead>
<tbody>

</tbody>

</table>
<nav aria-label="Page navigation" class="navn">
<ul class="pagination">
<li class="disabled">
<span>
<span aria-hidden="true">&laquo;</span>
</span>
</li>
<li class="active"><a href="#">1</a></li>
<li><a href="#">2</a></li>
<li><a href="#">3</a></li>
<li><a href="#">4</a></li>
<li><a href="#">5</a></li>
<li>
<a href="#" aria-label="Next">
<span aria-hidden="true">&raquo;</span>
</a>
</li>
</ul>
</nav>
</div>

<script type="text/html" id="prodition_list_temp">
{{each list pos index}}
<tr>
<td>{{index+1}}</td>
<td><img src="{{pos.logo}}"></td>
<td>{{pos.position}}}</td>
<td>{{pos.company}}}</td>
<td>{{pos.salary}}</td>
<td>{{pos.salary}}</td>
<td>{{pos.salary}}</td>
<td>{{pos.salary}}</td>
<td><a href="">修改</a></td>
<td><a href="">删除</a></td>
</tr>
{{/each}}
</script>

<!-- 模态框 -->
<div class="modal fade" id="addmyModal">
<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
<h4 class="modal-title" id="addPosModalLabel">添加职位</h4>
</div>
<div class="modal-body">
<div class="alert alert-danger hide add_pos_error" role="alert">职位添加失败，请稍后重试...</div>
<form class="add_pos_form">
<div class="form-group">
<label for="addPosLogo">Logo</label>
<input type="file" class="form-control" name="logo" id="addPosLogo">
</div>
<div class="form-group">
<label for="addPosName">职位名称</label>
<input type="text" class="form-control" name="position" id="addPosName" placeholder="请输入职位名称">
</div>
<div class="form-group">
<label for="addPosCompany">公司名称</label>
<input type="text" class="form-control" name="company" id="addPosCompany" placeholder="请输入公司名称">
</div>
<div class="form-group">
<label for="addPosSalary">薪资</label>
<input type="text" class="form-control" name="salary" id="addPosSalary" placeholder="请输入薪资">
</div>
</form>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
<button type="button" class="btn btn-primary btn_add">添加</button>
</div>
</div>
</div>
</div>`;

$.extend(prodition.prototype, {
creatDom:function(){
    $(prodition.template).appendTo(".tab-content");
  },

/*  creattables:function(){
    $.getJSON("/lib/json/user.json",function(data){
     const html = template("user",{list:data.res_body.list});
     $(".newtable").prepend(html);
    })
  },*/
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
    })
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
    })




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
    $.get("/api/addpro/list",{pageIndex:currentPage},function(data){
      if (data.res_code===0) {
        //利用末班引擎
        const html = template("prodition_list_temp",{list:data.res_body})
        $(".pos_table tbody").html(html)
      }
    },"json")
  }
});
new prodition();

