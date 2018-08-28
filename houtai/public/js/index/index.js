 
function Index() {

}

$.extend(Index.prototype, {
	loadHeader : function() {
		new header();
	},
	check:function(){
    	$.get("/api/users/check",(data)=>{
    		if (data.res_code === -1) {
    			$("#link_to").removeAttr("href");
    		}else
    			$("#link_to").attr("href","html/prodition.html");
    		
    	},"json")
    },

/*	creattables:function(){
		$.getJSON("lib/json/user.json",function(data){
		 const html = template("user",{list:data.res_body.list});
		 $(".newtable").prepend(html);
		})
	}*/
});
new Index().loadHeader();
new Index().check();

