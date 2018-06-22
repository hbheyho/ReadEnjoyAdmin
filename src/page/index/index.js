/**
 * @author HB
 * @date 2018/6/15
 * @fileName index.js
 * @Description:  后台主页js
*/
"use strict";
/*引入自身css*/
require("./index.css");
/*引用工具类 _mm*/
var _mm = require("util/mm");
/*引入userservice*/
var _user = require("service/userService");
/*引入皮肤*/
require("image/skin/default/skin.css");
var page = {
    init: function () {
        this.bindEvent();
        this.loadUserInfo();
    },
    bindEvent: function(){
        // 退出登录
        $("#logout-btn").on("click",function () {
            _user.logout(function (data,msg) {
                layer.msg(msg);
                setTimeout(function () {
                    _mm.doLogin();
                },1000);
            },function (errMsg) {
               layer.msg(errMsg);
            });
        })
    },
    // 加载登录用户信息
    loadUserInfo: function () {
        var userInfoHtml = "<a href=\"#\" class=\"dropDown_A\">{{username}} <i class=\"fa fa-angle-down menu_dropdown-arrow\"></i></a>";
        _user.getUserInfo(function (data) {
           userInfoHtml = _mm.renderHtml(userInfoHtml,{
                username: data.username
            });
           console.log(userInfoHtml);
            $("#admin-name").html(userInfoHtml);
        },function (errMsg) {
           alert("请进行管理员登录之后在进行操作");
           _mm.doLogin();
        });
    }
}
$(function () {
    page.init();
     // 左侧菜单的隐藏显示
    $(".pngfix").on("click",function () {
            if($(this).hasClass("open")){
                $(this).removeClass("open");
                $("body").removeClass("big-page");
            } else {
                $(this).addClass("open");
                $("body").addClass("big-page");
            }
    });
    /*查看个人信息*/
    function myselfinfo_show(title,url,w,h){
        layer_show(title,url,w,h);
    }
    /*书籍-添加*/
    function book_add(title,url,w,h){
        layer_show(title,url,w,h);
    }
    /*用户-添加*/
    function member_add(title,url,w,h){
        layer_show(title,url,w,h);
    }

    /*管理员-添加*/
    function admin_add(title,url,w,h){
        layer_show(title,url,w,h);
    }


});