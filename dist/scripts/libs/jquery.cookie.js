"use strict";jQuery.extend({addCookie:function(e,t,o){var n=new Date;n.setDate(n.getDate()+o),document.cookie=e+"="+t+"; expires="+n},getCookie:function(e){var t=document.cookie;if(!t)return null;var o=new RegExp("(^|s)"+e+"=([^;]+)$"),n=new RegExp("(^|s)"+e+"=([^;]+);");return o.test(t)?t.match(o)[2]:t.match(n)[2]},removeCookie:function(){}});