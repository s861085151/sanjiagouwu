require(["../../static/conf/config.js"], function(){
	require(["jquery","jq.cookie"], function($) {
		$(()=>{
			let $click_tap = $("#click_tap").children();
			$click_tap.each(function(index) {
				$(this).on("click", ()=>{
					$(this).addClass("hover").siblings().removeClass("hover");
					if(index == 0) {
						$(".log_input").css("display","block");
						$(".reg_input").css("display","none");
					} else {
						$(".reg_input").css("display","block");
						$(".log_input").css("display","none");
					}
				})
			})
			
			//打开网页显示验证码
			let codeReg = verification();
			//登录密码可见
			let eyes = 1;
			$(".eyes").on("click",function() {
				eyes*=-1
				if(eyes == -1) {
					$(".eyes").addClass("icon-xianshimima").removeClass("icon-ziyuan")
					$(".pwd_log_input").attr("type","text")
				}
				if(eyes == 1) {
					$(".eyes").addClass("icon-ziyuan").removeClass("icon-xianshimima")
					$(".pwd_log_input").attr("type","password")
				}
			})
			
			//登录注册验证
			let $userLogInput = $("#user_log_input")
			let $pwdLogInput = $("#pwd_log_input")
			let $loginLogBtn = $("#login-btn")
			
			let $phoneRegInput = $("#phone_reg_input")	//注册手机号输入
			let $pwdRegInput = $("#pwd_reg_input")	//注册密码输入
			let $codeRegInput = $("#code_reg_input")	//验证码输入
			let $loginRegBtn = $("#login_btn") 		//立即注册
			
			//登录验证
			$loginLogBtn.on("click", function() {
				if($userLogInput.val() == "" || $pwdLogInput.val() == "") {
					alert("输入用户名或密码");
				} else {
					let all = JSON.parse(localStorage.getItem("userdata"));
					for(let i=0; i<all.length; i++) {
						if($userLogInput.val() == all[i].username && $pwdLogInput.val() == all[i].password) {
							alert("登陆成功");
							window.location.assign("http://localhost:9999/pages/home/index.html");	
							break;
						} else {
							alert("用户名或者密码错误");
							break;
						}
					}
				}
			})
			
			//验证手机格式是否正确
			
			$phoneRegInput.on("blur", function() {
				let user_reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test($phoneRegInput.val())
				if(user_reg == false && $phoneRegInput.val() != "") {
					$(".phone_reg").css("display","block");
				} else {
					$(".phone_reg").css("display","none");
				}
			})
			$phoneRegInput.on("input", function() {
				if($phoneRegInput.val() == "") {
					$(".phone_reg").css("display","none");
				}
			})
			
			
			let check = 1;
			$("#checkInput").on("click",function() {
				check*=-1;
				if(check < 0) {
					$(".error").show();
				} else {
					$(".error").hide();
				}
			})
			
			//点击注册存入数据
			let arr = [];
			if($(".error").css("display") == "none") {
				$loginRegBtn.on("click", function() {
					if(reg() == true) {
						let user = {
							"username" : $phoneRegInput.val(),
							"password" : $pwdRegInput.val()
						}
						let str = window.localStorage.getItem("userdata");
						if(!str) {
							arr = [];
						} else {
							arr = JSON.parse(str);
						}
						let loged = arr.find(function(item) {
							return item.username == user.username;
						})
						if(!loged) {
							arr.push(user);
							localStorage.setItem("userdata", JSON.stringify(arr));
						}
						alert("注册成功，快去登录吧！！！")
						
						window.location.assign("http://localhost:9999/pages/home/index.html");	
					}
					codeReg = verification();
				})
			
			}
			
			
			//登录注册按钮变色
			$userLogInput.on("input", function() {
				if($userLogInput.val() != "" && $pwdLogInput.val() != "") {
					$loginLogBtn.css("background", "#BABABA")
				} else {
					
					$loginLogBtn.css("background", "#BABABA")
				}
			})
			
			$pwdLogInput.on("input", function() {
				if($userLogInput.val() != "" && $pwdLogInput.val() != "") {
					$loginLogBtn.css("background", "blue")
				} else {
					$loginLogBtn.css("background", "#BABABA")
				}
			})
			
			$phoneRegInput.on("input", function() {
				if($userLogInput.val() != "" && $pwdLogInput.val() != "" && $codeRegInput.val() != "") {
					$loginRegBtn.css("background", "#BABABA")
				} else {
					
					$loginRegBtn.css("background", "#BABABA")
				}
			})
			
			$pwdRegInput.on("input", function() {
				if($phoneRegInput.val() != "" && $pwdRegInput.val() != "" && $codeRegInput.val() != "") {
					$loginRegBtn.css("background", "blue")
				} else {
					$loginRegBtn.css("background", "#BABABA")
				}
			})
			
			$codeRegInput.on("input", function() {
				if($phoneRegInput.val() != "" && $pwdRegInput.val() != "" && $codeRegInput.val() != "") {
					$loginRegBtn.css("background", "blue")
				} else {
					$loginRegBtn.css("background", "#BABABA")
				}
			})
			
			
			//检测是否重复
			$phoneRegInput.on("blur", function() {
				
				let all = JSON.parse(localStorage.getItem("userdata"));
				if(all) {
					for(let i=0; i<all.length; i++) {
						if($phoneRegInput.val() == all[i].username) {
							alert("该手机号已注册")
						}
					}
				}
			})
			
			function reg() {
				if(noEmpty()) {
					if($(".phone_reg").css("display") == "block") {
						alert("用户名格式错误");
						clear();
						return false;
					} else if($pwdRegInput.val().length < 8) {
						alert("密码长度错误");
						clear();
						return false;
					} else if($codeRegInput.val() != codeReg) {
						console.log($codeRegInput.val(),codeReg)
						alert("验证码错误，请重新输入");
						clear();
						return false;
					} else {
						return true;
					}
				}
			}
			
			function noEmpty() {
				if($phoneRegInput.val() == "") {
					alert("用户名不能为空")
					return false;
				} else if($pwdRegInput.val() == "") {
					alert("密码不能为空")
					return false;
				} else if($codeRegInput.val() == "") {
					alert("验证码不能为空")
					return false;
				}
				return true;
			}
			
			//清空输入框
			function clear() {
				$phoneRegInput.val("");
				$pwdRegInput.val("");
				$codeRegInput.val("");
			}
			function verification() {
				var show_num = [];
		        draw(show_num);
		
		        $("#canvas").on('click',function(){
		            draw(show_num);
		        })
		        let code = show_num.join("");
	            console.log(code)
	            return code;
			}
	        
		    function draw(show_num) {
		        var canvas_width=$('#canvas').width();
		        var canvas_height=$('#canvas').height();
		        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
		        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
		        canvas.width = canvas_width;
		        canvas.height = canvas_height;
		        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
		        var aCode = sCode.split(",");
		        var aLength = aCode.length;//获取到数组的长度
		        
		        for (var i = 0; i <= 3; i++) {
		            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
		            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		            var txt = aCode[j];//得到随机的一个内容
		            show_num[i] = txt.toLowerCase();
		            var x = 10 + i * 20;//文字在canvas上的x坐标
		            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
		            context.font = "bold 23px 微软雅黑";
		
		            context.translate(x, y);
		            context.rotate(deg);
		
		            context.fillStyle = randomColor();
		            context.fillText(txt, 0, 0);
		
		            context.rotate(-deg);
		            context.translate(-x, -y);
		        }
		        for (var i = 0; i <= 5; i++) { //验证码上显示线条
		            context.strokeStyle = randomColor();
		            context.beginPath();
		            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		            context.stroke();
		        }
		        for (var i = 0; i <= 30; i++) { //验证码上显示小点
		            context.strokeStyle = randomColor();
		            context.beginPath();
		            var x = Math.random() * canvas_width;
		            var y = Math.random() * canvas_height;
		            context.moveTo(x, y);
		            context.lineTo(x + 1, y + 1);
		            context.stroke();
		        }
		    }
		
		    function randomColor() {//得到随机的颜色值
		        var r = Math.floor(Math.random() * 256);
		        var g = Math.floor(Math.random() * 256);
		        var b = Math.floor(Math.random() * 256);
		        return "rgb(" + r + "," + g + "," + b + ")";
		    }
		})
	})
})
