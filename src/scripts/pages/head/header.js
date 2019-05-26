require(["../../static/conf/config.js"], function(){
	require(["jquery","template"], function($){
		
		//点击logo返回首页
		$(".banner a").attr("href","http://localhost:9999/pages/home/index.html")
		
		$.ajax({
			type : "get",
			dataType : "json",
			url : "http://localhost:8000/listhead",
			success : function(data) {
				let list_left = template("list_left", data);
				$(".listLeft ul").html(list_left);
				
				let list_right = template("list_right", data);
				$(".listGroup").append(list_right);
				
				//鼠标移到所有物品显示目录
				$("#allshop").on("mouseenter", function() {
					$(".listGroup").show();
				})
				$("#allshop").on("mouseleave", function() {
					$(".listGroup").hide();
				})
				
				$(".listGroup").on("mouseenter", function() {
					$(this).show();
				})
				
				$(".listGroup").on("mouseleave", function() {
					$(this).hide();
				})
				
				let leftNav = $(".leftNav").children();
				let rightNav = $(".listRight");
				leftNav.each(function(index) {
					$(this).on("mouseenter", function() {
						rightNav.eq(index).show().siblings(":not('.listLeft')").hide();
						$(".listGroup").width(545)
					})
					$(this).on("mouseleave", function() {
						rightNav.hide();
						$(".listGroup").width(190);
					})
					
					rightNav.on("mouseenter", function() {
						rightNav.eq(index).show().siblings(":not('.listLeft')").hide();;
						$(".listGroup").width(545);
					})
					rightNav.on("mouseleave", function() {
						rightNav.hide()
						$(".listGroup").width(190);
					})
				})
				
			}
		})
		
		if(localStorage.getItem("goodCar")) {
			let $goods_car_count = JSON.parse(localStorage.getItem("goodCar")).length;
			$(".circle").text($goods_car_count)
		} else {
			$(".circle").text(0);
		}
		
		$(".shopping a").attr("href", "http://localhost:9999/pages/shoppingCar/shoppingCar.html")
		//点击登录 注册 跳转登录页面
		$(".log").attr("href","http://localhost:9999/pages/log-reg/log-reg.html")
		$(".reg").attr("href","http://localhost:9999/pages/log-reg/log-reg.html")
	})
})