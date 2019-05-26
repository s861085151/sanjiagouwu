require(["../../static/conf/config.js"], function(){
	require(["jquery","sw","template","header"], function($, Swiper){
		
		//轮播图
		$(function() {
			let $Img = $("#banner").children();
			let $Btn = $("#bannerBtn").children();
			let banner_count = 1;
			let t = null;
			$.t = setInterval(function() {
				imgTap(); 
				btnTap();
				banner_count++;
			},2000)
			
			//点击切换
			$Btn.each(function(index) {
				$(this).on("click", function() {
					banner_count = index;
					imgTap();
					btnTap();
				})
			})
			
			//鼠标移上去停止定时器
			$Img.on("mouseover", ()=>{
				clearInterval($.t);
			})
			
			//鼠标离开开始轮播
			$Img.on("mouseout",()=>{
				resetBanner();
			})
			
			//鼠标移到圆点上切换对应的图片
			//鼠标离开
			$Btn.each(function(index) {
				$(this).on("mouseover", function() {
					banner_count = index;
					imgTap();
					btnTap();
					clearInterval($.t);
				})
				$(this).on("mouseout", function() {
					resetBanner();
				})
			})
			//图片轮播
			function imgTap() {
				$Img.each(function(index) {
					if(index == banner_count%6) {
						$(this).addClass("show").removeClass("hide").siblings().removeClass("show").addClass("hide");
					}
				})
			}
			//按钮轮播
			function btnTap() {
				$Btn.each(function(index) {
					if(index == banner_count%6) {
						$(this).addClass("on").siblings().removeClass();
					}
				})
			}
			//点击或者移上去切换对应的图片
			function tap() {
				
			}
			//重启轮播定时器
			function resetBanner() {
				$.t = setInterval(function() {
					imgTap();
					btnTap();
					banner_count++;
				},2000)
			}
			/*//防抖
			function debounce(fn,delay) {
				let t = null;
				return function() {
					clearTimeout(t)
					t= setTimeout(()=>{
						fn()
					},delay)
				}
			}*/
		
			
		})
	
		$(function() {
			//直播列表
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/program",
				success : function(data) {
					let htmlstr = template("program", data);
					$("#goods_right").html(htmlstr);
				}
			})
			//热销商品
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/hotgoods",
				success : function(data) {
					let strhtml = template("hot_goods", data);
					$("#hotgoods").html(strhtml);
				}
			})
			/*//热销商品轮播
			
			let $hotImgTap = $("#hotgoods").children(".hot_others");
			console.log($hotImgTap)*/
			
			//新品推荐
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/newgoods",
				success : function(data) {
					let strhtml = template("new_products", data);
					$("#newgoods").html(strhtml);
					
					//存入本地存储
					localStorage.setItem("newgoods_data", JSON.stringify(data));
				}
			})
			
			//食品健康
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/foodhealth",
				success : function(data) {
					let strhtml = template("food_health", data);
					$("#food_left").append(strhtml);
					let listfood = template("food_health_list", data);
					$("#food_right_list").html(listfood);
				}
			})
			//食品健康轮播
			let food_count = 1;
			setInterval(()=>{
				$("#food_right_list").animate({
					top: food_count++*-520	
				})
				let food_num = Math.ceil($("#food_right_list").height() / $(".food_right_list").height())
				if(food_count >= food_num) {
					food_count = 0;
				}
			},3000)
			
			//厨房用品
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/kitchen",
				success : function(data) {
					let kitchenleft = template("kitchen_supplies", data);
					$("#kitchen_left").append(kitchenleft);
					let kitchenlist = template("kitchen_supplies_list", data);
					$("#kitchen_right_list").html(kitchenlist);
				}
			})
			//厨房用品轮播
			let kitchen_count = 1;
			setInterval(()=>{
				$("#kitchen_right_list").animate({
					top: kitchen_count++*-520	
				})
				let kitchen_num = Math.ceil($("#kitchen_right_list").height() / $(".kitchen_right_list").height())
				if(kitchen_count >= kitchen_num) {
					kitchen_count = 0;
				}
			},3000)
			
//		更多分类
//			家电数码
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/electric",
				success : function(data) {
					let morelist = template("electric_list", data);
					$("#electric").append(morelist);
				}
			})
			//			家居服饰
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/homedress",
				success : function(data) {
					let morelist = template("homedress_list", data);
					$("#homedress").append(morelist);
				}
			})
			//			服装箱包
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/clothing",
				success : function(data) {
					let morelist = template("clothing_list", data);
					$("#clothing").append(morelist);
				}
			})
			//			美妆个护
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/cosmetics",
				success : function(data) {
					let morelist = template("cosmetics_list", data);
					$("#cosmetics").append(morelist);
				}
			})
			//			珠宝配饰
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/jewelry",
				success : function(data) {
					let morelist = template("jewelry_list", data);
					$("#jewelry").append(morelist);
				}
			})
			//			运动户外
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/sports",
				success : function(data) {
					let morelist = template("sports_list", data);
					$("#sports").append(morelist);
				}
			})
			//			收藏旅游
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/travel",
				success : function(data) {
					let morelist = template("travel_list", data);
					$("#travel").append(morelist);
				}
			})
			
			//点击切换
			let $more_nav = $(".module_nav").children();
			let $more_list = $("#more_list").children();
			$more_nav.each(function(index) {
				$(this).on("click", function() {
					$(this).addClass("init").siblings().removeClass("init");
					$more_list.eq(index).css({display:"block"}).siblings().css({display:"none"});
//					$more_list.eq(index).removeClass("hide").siblings().addClass("hide");
					
				})
				$(this).on("mouseover", function() {
					$(this).addClass("hover");
				})
				$(this).on("mouseout", function() {
					$(this).removeClass("hover");
				})
			})
			
			
			//左右侧边栏
			//今日直播
			let todayvideo_top = $(".todayvideo").offset().top;
			$(window).scroll(function() {
				if($(window).scrollTop() >= todayvideo_top) {
					$(".sideLeftNav").show();
				} else {
					$(".sideLeftNav").hide();
				}
				if($(window).scrollTop() >= todayvideo_top+200) {
					$(".sideRightNav").show();
				} else {
					$(".sideRightNav").hide();
				}
			})
			
			let $eleTop = $(".ele_top");
			
			$eleTop.each(function(index) {
				$(window).scroll(function() {
					if(index>=0 && index<$eleTop.length-1) {
						if($(window).scrollTop() >= $eleTop.eq(index).offset().top-10 && $(window).scrollTop() < $eleTop.eq(index+1).offset().top) {
							$(".sideLeftNav li a").removeClass("active")
							$(".sideLeftNav li a").eq(index).addClass("active")
						}
					}else if($(window).scrollTop() >= $(".more").offset().top-10) {
						$(".sideLeftNav li a").removeClass("active")
							$(".sideLeftNav li a").eq(index).addClass("active")
					}
					
				})
			})
			
			//购物车数量显示
			if(localStorage.getItem("goodCar")) {
			let $goods_car_count = JSON.parse(localStorage.getItem("goodCar")).length;
				$(".goodCar .number").text($goods_car_count)
			} else {
				$(".goodCar .number").text(0);
			}
			$(".goodCar").attr("href","http://localhost:9999/pages/shoppingCar/shoppingCar.html")
			$(".backTop").click(function() {
				$(window).scrollTop() == 0;
			})
		})
	})
})