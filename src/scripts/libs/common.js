//获取两位数
function doubleNum(n) { //两位数 不够加0
	n = n + "";
	return n.length == 1 ? "0" + n : n;
}

//获取日期
function date2string(d) { //定义日期
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var hour = d.getHours();
	var min = d.getMinutes();
	var sec = d.getSeconds();
	return(year + "-" + doubleNum(month) + "-" + doubleNum(date) + " " + doubleNum(hour) + ":" + doubleNum(min) + ":" + doubleNum(sec))
}

//获取随机整数
function randomInt(a, b) {
	return Math.min(a, b) + parseInt(Math.random() * (Math.abs(a - b)));
}

//获取随机16进制颜色
function randomColor() {
	var r = randomInt(0, 255).toString(16);
	var g = randomInt(0, 255).toString(16);
	var b = randomInt(0, 255).toString(16);
	return "#" + doubleNum(r) + doubleNum(g) + doubleNum(b);
}

//获取行内样式的兼容问题
function getStyle(element, pro) {
	if(element.currentStyle) {
		return element.currentStyle[pro]; //IE8
	} else {
		return window.getComputedStyle(element)[pro]; //标准
	}
}

//获取元素的位置
function getPostion(ele) {
	if(!ele) throw new Error("ele参数有问题，无法获取位置");
	var _left = ele.offsetLeft;
	var _top = ele.offsetTop;
	while(ele.offsetParent) {
		_left += ele.offsetParent.offsetLeft;
		_top += ele.offsetParent.offsetTop;
		ele = ele.offsetParent;
	}
	return {
		x: _left,
		y: _top
	};
}

//拖拽元素插件封装
function draggable(ele, options) {
	//判断元素是否存在
	//元素的类型是否正确，是否是DOM元素
	//元素是否定位
	if(!ele) throw new Error("元素不存在");
	if(ele.nodeType != 1) throw new Error("元素类型不正确，请判断参数是否为元素节点");
	if(getStyle(ele).position == "static") throw new Error("请确定元素是否定位");

	//定义options的默认值
	var options_default = {
		x: options ? (typeof options.x == "boolean" ? options.x : true) : true,
		y: options ? (typeof options.y == "boolean" ? options.y : true) : true,
	}
	var mouseX = 0;
	var mouseY = 0;

	function start(eve) {
		var e = eve || event;
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		addEvent(document, "mousemove", move);
	}

	function move(eve) {
		var e = eve || event;
		if(options_default.x) {
			var _left = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - mouseX;
			_left = Math.min(Math.max(_left, 0), window.innerWidth - ele.offsetWidth);
			ele.style.left = _left + "px";
		}
		if(options_default.y) {
			var _top = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - mouseY;
			_top = Math.min(Math.max(_top, 0), window.innerHeight - ele.offsetHeight);
			ele.style.top = _top + "px";
		}

	}

	addEvent(ele, "mousedown", start)

	addEvent(document, "mouseup", function() {
		removeEvent(document, "mousemove", move)
	})
	//封装函数
	//监听事件的兼容
	function addEvent(ele, eventname, fn, isCapture) { //元素，事件名称，函数，是否捕获
		if(window.VBArray) {
			ele.attachEvent("on" + eventname, fn);
		} else {
			ele.addEventListener(eventname, fn, isCapture)
		}
	}

	function removeEvent(ele, eventname, fn) {
		if(window.VBArray) {
			ele.detachEvent("on" + eventname, fn);
		} else {
			ele.removeEventListener(eventname, fn);
		}
	}
	return function() {
		removeEvent(ele, "mousedown", start);
	}
}



//选择器封装
function $(selector) {
	var startWith = "";									//定义了一个容器
	if(/^#/.test(selector)) {							//开头为#号的
		startWith = "id";
	} else if(/^\./.test(selector)) {					//开头是.的
		startWith = "class";
	} else if(/^[^#\.]/.test(selector)) {				//不是# . 开头的
		startWith = "tagname";
	}
	
	if(/\[\w+=.+?\]/.test(selector)) {						//属性选择器
		var arr = selector.match(/(.+?)\[(\w+)=(.+?)\]/);	//分组取出
		//.box[name=123]
		var _sel = arr[1];		//选择器		.box
		var propname = arr[2];	//属性名		name
		var propvalue = arr[3];	//属性值		123
		var elelist = null;		//定义一个空的数组
		switch(startWith) {
			
			case "id" : return _id(_sel.substring(1));			
			case "class" : {
				
				elelist = Array.from(_class(_sel.substring(1)));
				console.log(elelist);
				return elelist.filter(function(val, index){				//过滤
					console.log(val);
					return val[propname] == propvalue;					//返回结果为123的属性名
				});
			}
			case "tagname" : {
				elelist = Array.from(_tag(_sel));
//				console.log(elelist);
				return elelist.filter(function(val,index) {
					return val[propname] == propvalue;
				})
			}
			return null;
		}
	}
	
	switch(startWith) {
		case "id" : return _id(selector.substring(1));			
		case "class" : {
			return _class(selector.substring(1));
		}
		case "tagname" :  {
			return _tag(selector);
		}
	}
	
	function _id(id) {
		return document.getElementById(id);
	}
	function _class(classname) {
		return document.getElementsByClassName(classname);
	}
	function _tag(tag) {
		return document.getElementsByTagName(tag);
	}
}

//添加Cookie
function addCookie(key, value, days) {
	var now = new Date();
	now.setDate(now.getDate() + days);
	//创建Cookie   document.cookie = "username = honny";
	document.cookie = key + "=" + value + "; expires=" + now;
}
//得到Cookie
function getCookie(key) {
	var str = document.cookie;
	if(!str) return null;
	var reg1 = new RegExp("(^|\s)"+key + "=([^;]+)$");
	var reg2 = new RegExp("(^|\s)"+key + "=([^;]+);");
	if(reg1.test(str)) {
		return str.match(reg1)[2];
	} else {
		return str.match(reg2)[2];
	}
}
//获取非行内样式
function getStyle(ele) {
	if(window.VBArray) {
		return ele.currentStyle;
	} else {
		return getComputedStyle(ele);
	}
}
