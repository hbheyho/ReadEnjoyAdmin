/**
 * @author HB
 * @date 2018/6/14
 * @fileName index.js
 * @Description:  后台登录js
*/
/*引入自身css*/
"use strict";
require("./index.css");
/*引用验证码插件*/
require("util/codeVerify");
/*引用工具类 _mm*/
var _mm = require("util/mm");
/*引入userservice*/
var _user = require("service/userService");
// 表单错误提示
var formError = {
    show:function (errMsg) {
        $(".error-item").show().find(".tips").text(errMsg);
    },
    hide:function () {
        $(".error-item").hide().find(".tips").text("");
    }
};
var  page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent:function(){
        var _this = this;
        // 加载验证码canvas
        var verifyCode = new GVerify("vContainer");
        //注册按钮提交
        $("#loginButton").click(function(e){
            //阻止表单默认事件
            event.preventDefault();
            _this.submit(verifyCode);
        });
        //回车键提交
        $(".input-text").keyup(function(e){
            if (e.keyCode == 13) {
                _this.submit(verifyCode);
            }
        });
    },
    submit:function (verifyCode) {
    var formData = {
            email:$.trim($("#email").val()),
            password:$.trim($("#password").val())
        },
        validateResult = this.formValidate(formData);
    if (validateResult.status){
        //验证码验证
        var validecode = verifyCode.validate(document.getElementById("codeInput").value);
            _user.login(formData, function (res) {
                if (validecode) {
                    window.location.href = _mm.getUrlParam("redirect") || "./index.html";
                }else {
                    formError.show("验证码错误 ");
                }
            }, function (errorMsg) {
                /*错误信息展示(包括status = 1时)*/
                formError.show(errorMsg);
            });
    }else {
        formError.show(validateResult.msg);
    }
   },
    //表单验证
    formValidate:function (formData) {
        var result = {
            status:false,
            msg:""
        };
        if (!_mm.validate(formData.email,"require")){
            result.msg = "邮箱不能为空！";
            return result;
        }
        if (!_mm.validate(formData.password,"require")){
            result.msg = "密码不能为空！";
            return result;
        }
        //验证通过 返回正确提示
        result.status = true;
        result.msg = "验证通过";
        return result;
    }
};
$(function(){
   page.init();
});
