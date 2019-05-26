require.config({
	baseUrl : "http://localhost:9999/",
	paths : {
		"jquery" : "scripts/libs/jquery-2.0.3.min",
		"jq.cookie" : "scripts/libs/jquery.cookie",
		"sw" : "scripts/libs/swiper.min",
		"jquery.validate" : "scripts/libs/jquery.validate.min",		//表单验证
		"jquery.ui" : "scripts/libs/jquery-ui.min",
		"css" : "scripts/libs/css",
		"ajax" : "scripts/libs/ajax",
		"template" : "scripts/libs/template",
		"header" : "scripts/pages/head/header"
//		"common" : "scripts/libs/common"
	},
	shim : {		//配置额外的其他模块
		"jq.cookie" : {
			deps : ["jquery"]
		},
		"sw" : {
			deps : ["css!styles/swiper.css"]
		},
		"jquery.ui" : {
			deps : ["css!styles/jquery-ui.min.css"]
		},
		
	}
})