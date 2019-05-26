

	jQuery.extend({
		addCookie: function(key, value, days){
			var now = new Date();
			now.setDate(now.getDate() + days);
			//创建Cookie   document.cookie = "username = honny";
			document.cookie = key + "=" + value + "; expires=" + now;
		},
		getCookie: function(key) {
			var str = document.cookie;
			if(!str) return null;
			var reg1 = new RegExp("(^|\s)"+key + "=([^;]+)$");
			var reg2 = new RegExp("(^|\s)"+key + "=([^;]+);");
			if(reg1.test(str)) {
				return str.match(reg1)[2];
			} else {
				return str.match(reg2)[2];
			}
		},
		removeCookie : function(){
			
		}
	})


	
