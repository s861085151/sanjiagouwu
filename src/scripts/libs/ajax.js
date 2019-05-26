/*
 * ajax{
 * 		type: "get" / "post" / "jsonp",
 * 		dataType: "json",    						//是否需要转为josn格式
 * 		jsonpCallback:	callback(默认值) / cb / cbk	,	// 接口类型
 * 		url:xxxxxxxxxxxx,							//地址
 * }
 */
let ajax;
define(function() {
	ajax = (function() {
		let cache = new Map();
		return function(options) {
			return new Promise(function(resolve, reject) {
				//默认值
				let defaults = {
					type: "get",
					jsonpCallback: "callback"
				};
				//合并对象
				Object.assign(defaults, options);
				let cacheData = cache.get(defaults.url);
				if(cacheData) {
					resolve(cacheData);
					return;
				}
	
				//如果为jsonp
				if(defaults.type == "jsonp") {
					let _script = document.createElement("script");
					let fnName = "$json_" + new Date().getTime() + Math.round(Math.random() * 100000000); //生成一个函数名字
					window[fnName] = function(data) {
						resolve(data);
						cache.set(defaults.url, data) //存入缓存数据
					}
					if(defaults.url.includes("?")) {
						//http://localhost:9090/test.action?name=123&callback=name
						_script.src = defaults.url + "&" + defaults.jsonpCallback + "=" + fnName;
					} else {
						//http://localhost:9090/test.action?callback=name
						_script.src = defaults.url + "?" + defaults.jsonpCallback + "=" + fnName;
					}
					document.body.appendChild(_script);
				} else {
					//request对象的兼容
					let xhr = null;
					if(window.VBArray) {
						xhr = new ActiveXObject("Msxml2.XMLHTTP");
					} else {
						xhr = new XMLHttpRequest();
					}
					xhr.open(defaults.type, defaults.url);
					xhr.onload = function() {
						resolve(xhr.response)
						cache.set(defaults.url,xhr.response) //存入缓存数据
					}
					if(defaults.type == "get") {
						xhr.send();
					}
					if(defaults.type == "post") { //如果post
						xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						xhr.send(defaults.data);
					}
				}
			})
		}
	})()	
})
