require(["../../static/conf/config.js"], function(){
	require(["jquery","template","header"], function($){
	
		
		$(".list_pic img").on("mouseover", function() {
			let minsrc = $(this).attr("src");
			$(".middlePic").attr("src",minsrc);
			$(".bigPic").attr("src",minsrc);
		})
		
		//算出放大镜的大小
		let $smGlass = $(".glass");   //小放大镜
		let $bgGlass = $(".bigPicbox")	//大放大镜
		let $smPic = $(".picture");	//小图片
		let $bgPic = $(".bigPic");
		//小放大镜的大小
		$smGlass.width($smPic.width()/$bgPic.width()*$bgGlass.width());
		$smGlass.height($smPic.height()/$bgPic.height()*$bgGlass.height());
		
		$smPic.hover(function() {
			$smGlass.show();
			$(".bigPicbox").show()
		},function() {
			$smGlass.hide();
			$(".bigPicbox").hide()
		})
		
		$smPic.on("mousemove", function(e) {
			//小放大镜的位置
			let _left = e.pageX - $smPic.offset().left - $smGlass.width()/2;
			let _top = e.pageY - $smPic.offset().top - $smGlass.height()/2;
			//最大最小值
			_left = Math.min(Math.max(0,_left),$smPic.width()-$smGlass.width())
			_top = Math.min(Math.max(0,_top),$smPic.height()-$smGlass.height())
			$smGlass.css({
				"left" : _left,
				"top" : _top,
			})
			//比例
			let scale = $bgPic.width()/$smPic.width();
			$bgPic.css({
				"left" : -scale*_left,
				"top" : -scale*_top
			})
		})
		//同类商品
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/foodhealth",
				success : function(data) {
					let strhtml = template("similarGoods", data);
					$("#similar_goods").html(strhtml);
				}
			})
			
		//当滚动距离大于商品详情时候
		let ele_top = $("#fixed").offset().top + 188;
		$(window).on("scroll",function() {
			if($(window).scrollTop() >= ele_top) {
				$("#fixed").addClass("fixed");
				$(".price").show();
				$(".car").show();
			} else {
				$("#fixed").removeClass("fixed");
				$(".price").hide();
				$(".car").hide();
			}
		})
		
		//点击向上收起
		let show_hide = 1;
		$(".show_hide").on("click", function() {
			show_hide*=-1
			if(show_hide < 0) {
				$(".detail_list").css({
					"height" : 85,
					"overflow" : "hidden",
 				});
 				$(".show_hide i").text("向下展开");
 				$(".show_hide span").removeClass("icon-fanhuidingbu01").addClass("icon-fanhuidingbu-copy");
			} else {
				$(".detail_list").css({
					"height" : "auto",
					"overflow" : "visible",
 				});
 				$(".show_hide i").text("向上收起");
 				$(".show_hide span").removeClass("icon-fanhuidingbu-copy").addClass("icon-fanhuidingbu01");
			}
		})
		
		//用户评论
		for(let i=0; i<$(".userReview").length; i++) {
			$.ajax({
				type : "get",
				dataType : "json",
				url : "http://localhost:8000/userComment"+`${i+1}`,
				success : function(data) {
					let strhtml = template("user_comment"+`${i+1}`, data);
					$(".userReview").eq(i).html(strhtml);
					showBigImg();
					commentPageTap();
				}
			})
		}
		
		
		//鼠标点击显示大图
		function showBigImg() {
			$(".user_picture .minImg").each(function(index) {
				$(this).on("click", function() {
					$(".maxImg").eq(index).show();
				})
				$(".user_picture .minImg img").on("click", function() {
					let minImgSrc = $(this).attr("src");
					console.log(minImgSrc)
					$(".maxImg").eq(index-1).attr("src",minImgSrc);
				})
			});
		}
		//点击分页切换
		function commentPageTap() {
			$(".pNum").each(function(index) {
				$(this).on("click", function() {
					$(this).addClass("active").siblings().removeClass("active");
				$(".userReview").eq(index).show().siblings(".userReview").hide();
				})
			})
		}
		
		//点击加号数量增加，点击减号数量减少
		console.log($(".minus"))
		$(".minus").on("click", function() {
			console.log(1)
			if($(".countadd input").val() > 1) {
				$(".countadd input").val(parseInt($(".countadd input").val())-1);
			} else {
				$(".countadd input").val(1)
			}
		})
		
		$(".add").on("click", function() {
			$(".countadd input").val(parseInt($(".countadd input").val())+1);
		})
		
		//点击加入购物车
		$(".detailRight").on("click", function(e) {
			//获取点击的源元素
			let target = e.target || e.srcElement;
			let arr = [];
			if(target.className == "add_car") {
				//商品名称
				let p_name = $(".p_name").text();
				//商品价格
				let p_price = $(".targetLeft .number .money").text();
				//商品编号
				let p_code = $(".p_code span").text();
				//商品图片地址
				let p_img = $(".car_img").attr("src");
				let p_count = $(".countadd input").val();
				let list = {
					"p_name" : p_name,
					"p_price" : p_price,
					"p_code" : p_code,
					"p_img" : p_img,
					"p_count" : p_count
				}
				let str = window.localStorage.getItem("goodCar");
				if(!str) {
					arr = [];
				} else {
					arr = JSON.parse(str);
				}
				
				let listed = arr.find(function(item) {
					return item.p_code == list.p_code;
				})
				if(listed) {
					if(listed.p_count == 1) {
						listed.p_count++;
					} else {
						listed.p_count += parseInt(list.p_count);
					}
				} else {
					arr.push(list);
				}
				localStorage.setItem("goodCar", JSON.stringify(arr))
			}
		})
		
		
		//获取网址上的id
		function GetUrlParam(paraName) {
            var url = document.location.toString();
            var arrObj = url.split("?");

            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;

                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");

                    if (arr != null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return "";
            } else {
                return "";
            }
        }

		let goodId = GetUrlParam("itemCode");
		let goods_data = JSON.parse(localStorage.getItem("newgoods_data"));
		for(let i in goods_data){
			if(goodId == goods_data[i].sitemCode) {
				let num = goods_data[i].sitemCode.substr(goods_data[i].sitemCode.length-2,goods_data[i].sitemCode.length)
				console.log(num)
				$(".classify1").text(goods_data[i].wlgroupName);
				$(".classify2").text(goods_data[i].wmgroupName);
				$(".p_name").text(goods_data[i].itemName);
				$(".p_code span").text(goods_data[i].sitemCode);
				$(".money").text(goods_data[i].rsalePrice);
				$(".picture img").attr("src","https://image.ttcj.tv/item_images/"+num+"/"+goodId+"M1.jpg");
				$(".bigPicbox img").attr("src","https://image.ttcj.tv/item_images/"+num+"/"+goodId+"M1.jpg")
			}
		}
		
		//商品详情滚动切换
		$(window).scroll(function() {
			$(".content_header_nav li").removeClass("active")
			if($(window).scrollTop()>=$(".goods_content_text").offset().top && $(window).scrollTop()<$(".goods_content_video").offset().top) {
				$(".content_header_nav li").eq(1).addClass("active")
			}
			if($(window).scrollTop()>=$(".goods_content_video").offset().top && $(window).scrollTop()<$(".goods_evaluate").offset().top) {
				$(".content_header_nav li").eq(0).addClass("active")
			}
			if($(window).scrollTop()>=$(".goods_evaluate").offset().top) {
				$(".content_header_nav li").eq(2).addClass("active")
			}
		})
		
			
		$(".content_header").children().children(".price").text($(".rmb").text()+$(".money").text())
		
	})
})