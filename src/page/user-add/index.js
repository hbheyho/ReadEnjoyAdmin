/**
 * @author HB
 * @date 2018/6/17
 * @fileName index.js
 * @Description:  用户增加js
*/
/*引入自身css*/
"use strict";
require("./index.css");
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
var page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 进行username验证
        $("#username").blur(function () {
            var username = $.trim($("#username").val());
            if (!username){
                return;
            }
            // 异步验证用户名是否存在
            _user.checkUsername(username,function (data,res) {
                console.log(res);
                formError.hide();
            },function (errMsg) {
                console.log(errMsg);
                formError.show(errMsg);
            });
        });
        // 进行email验证
        $("#email").blur(function () {
            var email = $.trim($("#email").val());
            if (!email){
                return;
            }
            // 异步验证用户名是否存在
            _user.checkEmail(email,function (res) {
                formError.hide();
            },function (errMsg) {
                formError.show(errMsg);
            });
        });
        //注册按钮提交
        $("#add-user-btn").click(function(e){
            //阻止表单默认事件
            event.preventDefault();
            _this.submit();
        });
        //回车键提交
        $(".input-text").keyup(function(e){
            if (e.keyCode == 13) {
                _this.submit();
            }
        });
    },//表单提交
    submit:function(verifyCode){
        var formData = {
            username:$.trim($("#username").val()),
            gender:$.trim($("input[name='sex']:checked").val()),
            email:$.trim($("#email").val()),
            password:$.trim($("#password").val()),
            question:$.trim($("#question").val()),
            answer:$.trim($("#answer").val()),
            signs: $.trim($("#signs").val())
        };
        //表单验证返回结果
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            _user.addUser(formData, function (data, msg) {
                layer.msg(msg);
                // 2s之后自动关闭
                setTimeout(function () {
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.$('#add-user-btn').click();
                    parent.layer.close(index);
                },2000);
            }, function (errorMsg) {
                formError.show(errorMsg);
            });
        }else{
            formError.show(validateResult.msg);
        }
    },
    formValidate:function(formData){
        var result = {
            status:false,
            msg:""
        };
        if (!_mm.validate(formData.username,"require")){
            result.msg = "用户名不能为空";
            return result;
        }
        if (!_mm.validate(formData.email,"require")){
            result.msg = "邮箱不能为空";
            return result;
        }
        if (!_mm.validate(formData.email,"email")){
            result.msg = "邮箱格式错误";
            return result;
        }
        if (!_mm.validate(formData.password,"require")){
            result.msg = "密码不能为空";
            return result;
        }
        // 验证密码长
        if (!_mm.validate(formData.password,"password")){
            result.msg = "请输入正确的密码格式(8-16位数字与密码混合)";
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //验证通过 返回正确提示
        result.status = true;
        result.msg = "验证通过";
        return result;
    },
}
$(function () {
   page.init();
});