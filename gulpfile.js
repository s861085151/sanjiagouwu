const gulp = require("gulp");
const webserver = require("gulp-webserver");
const express = require("express");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const https = require("https");
const http = require("http");


//编译JS
gulp.task("compileJS", function(){
	gulp.src("src/scripts/**/*.js")
		.pipe( babel({
			presets : ["env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("dist/scripts") );
	gulp.src("src/static/**/*").pipe( gulp.dest("dist/static") );
})


//编译scss
gulp.task("compileCSS", function() {
	gulp.src("src/styles/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(csso())
		.pipe(gulp.dest("dist/styles"))
})

//复制html到自定文件夹
gulp.task("compileHTML", function() {
	gulp.src("src/pages/**/*.html")
		.pipe(gulp.dest("dist/pages"))
})

gulp.task("compileIMG", function() {
	gulp.src("src/styles/pages/img/**/*")
		.pipe(gulp.dest("dist/styles/pages/img"))
})

gulp.task("server", function(){
	//静态资源服务器 : 9999
	gulp.src("dist")
		.pipe( webserver({
			livereload : true,//时时实现，不需要手动刷页面
			directoryListing: true,
			port : 9999
		}) )
	//接听文件变化
	//js css html
	gulp.watch("src/styles/pages/img/**/*", ["compileIMG"])
	gulp.watch("src/scripts/**/*.js", ["compileJS"])
	gulp.watch("src/styles/**/*.scss", ["compileCSS"])
	gulp.watch("src/pages/**/*.html", ["compileHTML"])
	//接口代理服务器
	//头部所有物品目录
	//https://www.ttcj.tv/xml/pcCategoryJson.htm
	let app = express();
	app.get("/listhead", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/xml/pcCategoryJson.htm",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//直播目录https://ws.ttcj.tv/ws/disp/selectSecSaleMstList?sDate=20190518
	app.get("/program", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectSecSaleMstList?sDate=20190518",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	//热销榜单https://ws.ttcj.tv/ws/disp/selectTop20ItemsByReload?dispNo=201604270004&reloadYn=0
	app.get("/hotgoods", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectTop20ItemsByReload?dispNo=201604270004&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	
	//新品推荐https://ws.ttcj.tv/ws/disp/selectLCategoryNewPopularityRecommend
	app.get("/newgoods", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectLCategoryNewPopularityRecommend",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	//食品健康https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=61&reloadYn=0
	app.get("/foodhealth", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=61&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	//厨房用品https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=62&reloadYn=0
	app.get("/kitchen", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=62&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//更多分类
	//家电数码https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=63&reloadYn=0
	app.get("/electric", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=63&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//家居服饰https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=64&reloadYn=0
	app.get("/homedress", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=64&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//服装箱包https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=65&reloadYn=0
	app.get("/clothing", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=65&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//美妆个护https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=66&reloadYn=0
	app.get("/cosmetics", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=66&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//美妆个护https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=67&reloadYn=0
	app.get("/jewelry", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=67&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//运动户外https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=68&reloadYn=0
	app.get("/sports", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=68&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	//收藏旅游https://ws.ttcj.tv/ws/disp/selectOtherTop20Items?recommGb=69&reloadYn=0
	app.get("/travel", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "ws.ttcj.tv",
			path: "/ws/disp/selectOtherTop20Items?recommGb=69&reloadYn=0",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	
	//收藏旅游https://www.selected.com.cn/api/goods/goodsList?classifyIds=114781&currentpage=1&goodsHighPrice=&goodsLowPrice=&goodsSelect=&sortDirection=desc&sortType=1
	app.get("/cloth", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "www.selected.com.cn",
			path: "/api/goods/goodsList?classifyIds=114781&currentpage=1&goodsHighPrice=&goodsLowPrice=&goodsSelect=&sortDirection=desc&sortType=1",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	//用户评论https://cn.feelunique.com/o_comment/review/getComment?productId=141578&type=1&currentPage=1&limit=5&order=1
	app.get("/userComment1", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "cn.feelunique.com",
			path: "/o_comment/review/getComment?productId=141578&type=1&currentPage=1&limit=5&order=1",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	//用户评论https://cn.feelunique.com/o_comment/review/getComment?productId=141578&type=1&currentPage=1&limit=5&order=1
	app.get("/userComment2", (req,res)=>{
		res.setHeader("Access-Control-Allow-Origin","*"); //cors
		res.setHeader("Content-Type","text/plain; charset=utf8")
		let proxy = https.request({
			hostname: "cn.feelunique.com",
			path: "/o_comment/review/getComment?productId=141578&type=1&currentPage=1&limit=5&order=2",
			method: 'get'
		}, (response) => {
			response.pipe(res);
		});
		proxy.end();
	})
	
	
	
	app.listen(8000);
})

gulp.task("build", ["compileJS", "compileCSS", "compileHTML", "compileIMG"])