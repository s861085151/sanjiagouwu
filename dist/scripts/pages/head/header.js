"use strict";require(["../../static/conf/config.js"],function(){require(["jquery","template"],function(s){if(s(".banner a").attr("href","http://localhost:9999/pages/home/index.html"),s.ajax({type:"get",dataType:"json",url:"http://localhost:8000/listhead",success:function(t){var e=template("list_left",t);s(".listLeft ul").html(e);var o=template("list_right",t);s(".listGroup").append(o),s("#allshop").on("mouseenter",function(){s(".listGroup").show()}),s("#allshop").on("mouseleave",function(){s(".listGroup").hide()}),s(".listGroup").on("mouseenter",function(){s(this).show()}),s(".listGroup").on("mouseleave",function(){s(this).hide()});var l=s(".leftNav").children(),i=s(".listRight");l.each(function(t){s(this).on("mouseenter",function(){i.eq(t).show().siblings(":not('.listLeft')").hide(),s(".listGroup").width(545)}),s(this).on("mouseleave",function(){i.hide(),s(".listGroup").width(190)}),i.on("mouseenter",function(){i.eq(t).show().siblings(":not('.listLeft')").hide(),s(".listGroup").width(545)}),i.on("mouseleave",function(){i.hide(),s(".listGroup").width(190)})})}}),localStorage.getItem("goodCar")){var t=JSON.parse(localStorage.getItem("goodCar")).length;s(".circle").text(t)}else s(".circle").text(0);s(".shopping a").attr("href","http://localhost:9999/pages/shoppingCar/shoppingCar.html"),s(".log").attr("href","http://localhost:9999/pages/log-reg/log-reg.html"),s(".reg").attr("href","http://localhost:9999/pages/log-reg/log-reg.html")})});