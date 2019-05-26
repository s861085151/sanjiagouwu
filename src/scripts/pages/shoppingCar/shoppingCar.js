require(["../../static/conf/config.js"], function(){
	require(["jquery","template"], function($){
		
		let goodCarData = JSON.parse(localStorage.getItem("goodCar"));
		let htmlstr = template("goodCarList", goodCarData);
		$(".table_main").html(htmlstr);
	

		//点击logo返回首页
		$(".car_logo a").attr("href", "http://localhost:9999/pages/home/index.html")
		//购物车的件数
		if(localStorage.getItem("goodCar")) {
			let $goods_car_count = JSON.parse(localStorage.getItem("goodCar")).length;
			$(".goods_car_count").text("购物车("+$goods_car_count+"件)")
			
			$(".minus").on("click", function() {
				let p_code_mins = $(this).siblings(".p_code").val();
				let all = JSON.parse(localStorage.getItem("goodCar"));
				
				let index = all.findIndex(function(item) {
					return item.p_code == p_code_mins;
				})
				if(--all[index].p_count == 0) {
					all.splice(index,1)
				}
				let goodCount = $(this).siblings(".p_count").val($(this).siblings(".p_count").val()-1);
				$(this).parent().siblings(".goods_money").text("￥"+$(this).parent().siblings(".goods_unitPrice").text()*$(this).siblings(".p_count").val())
				localStorage.setItem("goodCar", JSON.stringify(all));
				
				if($(this).parent().siblings(".goods_choose").children().children("input:checked")) {
					$(".totalCost").text(0)
					totalPrice();
				}
			})
			
			$(".add").on("click", function() {
				let p_code_add = $(this).siblings(".p_code").val();
				let all = JSON.parse(localStorage.getItem("goodCar"));
				
				let index = all.findIndex(function(item) {
					return item.p_code == p_code_add;
				})
				++all[index].p_count;
				let goodCount = $(this).siblings(".p_count").val(parseInt($(this).siblings(".p_count").val())+1);
				$(this).parent().siblings(".goods_money").text("￥"+$(this).parent().siblings(".goods_unitPrice").text()*$(this).siblings(".p_count").val())
				localStorage.setItem("goodCar", JSON.stringify(all));
				
				if($(this).parent().siblings(".goods_choose").children().children("input:checked")) {
					$(".totalCost").text(0);
					totalPrice();
				}
			})
			
			$(".remove").on("click", function() { 
				$(this).parent().parent().remove();
				let p_code_remove =  $(".good_count .p_code").val();
				let all = JSON.parse(localStorage.getItem("goodCar"));
				let index = all.findIndex(function(item) {
					return item.p_code == p_code_remove;
				})
				all.splice(index,1)
				localStorage.setItem("goodCar", JSON.stringify(all));
				
				if($(this).parent().siblings(".goods_choose").children().children("input:checked")) {
					let romoveMoney = $(".totalCost").text()-$(this).parent().siblings(".goods_money").text().substr(1,$(this).parent().siblings(".goods_money").text().length)
					$(".totalCost").text(romoveMoney)
				}
			})
		} else {
			$(".goods_car_count").text("购物车(0件)")
		}
		
		
		//点击多选框显示多选图片
		//全选点击
		$(".checkAll").click(function() {
			//清空总价
			$(".totalCost").text(0)
			$("input[type='checkbox']").each(function(index) {
				$("input[type='checkbox']").eq(index).parent().parent().css("background","url(../../styles/pages/img/no_choose_icon.png) no-repeat center center")
			})
			$(".checkInput").prop("checked",$(this).prop("checked"))
			$("input:checked").each(function(index) {
				$("input:checked").eq(index).parent().parent().css("background","url(../../styles/pages/img/choose_icon.png) no-repeat center center")
			})
			//选中商品的数量
			//如果有选中的  -1  没有 为0
			if($("input:checked").length) {
				$(".selected").text($("input:checked").length-1)
			} else {
				$(".selected").text(0)
			}
			
			//选中商品的价格
			$("input:checked:gt(0)").each(function(index) {
				let $money = $("input:checked:gt(0)").eq(index).parent().parent().parent().children(".goods_money").text();
				$(".totalCost").text(parseInt($(".totalCost").text())+parseInt($money.substr(1,$money.length)))
			})
			
			
		})
		
		//分别点击
		$(".checkInput").click(function() {
			//清空总价
			$(".totalCost").text(0)
			$("input[type='checkbox']").each(function(index) {
				$("input[type='checkbox']").eq(index).parent().parent().css("background","url(../../styles/pages/img/no_choose_icon.png) no-repeat center center")
			})
			if($(this).prop("checked")) {
				if($("input:checked").length >= $(".checkInput").length) {
					$(".checkAll").prop("checked", true)
				}
			} else {
				$(".checkAll").prop("checked", false)
			}
			$("input:checked").each(function(index) {
				$("input:checked").eq(index).parent().parent().css("background","url(../../styles/pages/img/choose_icon.png) no-repeat center center")
			})
			
			//选中商品的数量价格
			if($(".checkAll").prop("checked")) {
				$(".selected").text($("input:checked").length-1)
				$("input:checked:gt(0)").each(function(index) {
					let $money = $("input:checked:gt(0)").eq(index).parent().parent().parent().children(".goods_money").text();
					$(".totalCost").text(parseInt($(".totalCost").text())+parseInt($money.substr(1,$money.length)))
				})
			} else {
				$(".selected").text($("input:checked").length)
				$("input:checked").each(function(index) {
					let $money = $("input:checked").eq(index).parent().parent().parent().children(".goods_money").text();
					$(".totalCost").text(parseInt($(".totalCost").text())+parseInt($money.substr(1,$money.length)))
				})
			}
			
		})
		
		//计算总钱数
		function totalPrice() {
			let $totalPrice = 0;
			$(".goods_money").each(function(index) {
				if($(this).siblings(".goods_choose").children().children("input").prop("checked")) {
					let _money = $(this).text();
					$totalPrice+=Number(_money.substr(1,_money.length));
				}
				$(".totalCost").text($totalPrice);
			})
		}
		
		//删除所有
		$(".choose_delete").click(function() {
			if($(".checkAll").prop("checked")) {
				$("input:checked:gt(0)").each(function(index) {
					$(this).parent().parent().parent().remove();
					let p_code_remove = $("input:checked:gt(0)").eq(index).parent().parent().parent().children(".good_count").children("p_code").val();
					let all = JSON.parse(localStorage.getItem("goodCar"));
					let _index = all.findIndex(function(item) {
						return item.p_code == p_code_remove;
					})
					all.splice(_index,1)
					localStorage.setItem("goodCar", JSON.stringify(all));
					$(".picAll").css("background","url(../../styles/pages/img/no_choose_icon.png) no-repeat center center")
				})
			} else {
				$("input:checked").each(function(index) {
					$(this).parent().parent().parent().remove();
					let p_code_remove = $("input:checked:gt(0)").eq(index).parent().parent().parent().children(".good_count").children("p_code").val();
					let all = JSON.parse(localStorage.getItem("goodCar"));
					let _index = all.findIndex(function(item) {
						return item.p_code == p_code_remove;
					})
					all.splice(_index,1)
					localStorage.setItem("goodCar", JSON.stringify(all));
					$(".picAll").css("background","url(../../styles/pages/img/no_choose_icon.png) no-repeat center center")
				})
			}
		})
		
		
	})
})