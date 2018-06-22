/**
* 2018-05-14 20:17:20
* 作者:HB
* 文件名:mm.js
* 描述:  工具类
*/
"use strict";
//引入hogan 模块
var hogan = require("hogan");
var conf = {
    serverHost: ""
};
var _mm={
    // 网络请求（需要session）
    requestAboutSeeion : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            xhrFields   :{
                 withCredentials: true
            },
            crossDomain : true,
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 网络请求(不需要session)
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 网络请求（需要session）
    requestAboutFile : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            xhrFields   :{
                withCredentials: true
            },
            crossDomain : true,
            processData: false,  // 注意：让jQuery不要处理数据
            contentType: false,  // 注意：让jQuery不要设置contentType
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl:function (path) {
      return conf.serverHost = path ;
    },
    //获取url参数的value
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);  // 提取要获取的参数name的值
        // window.location.search 可设置或返回当前 URL 的查询部分（问号 ? 之后的部分）。
        return result ? decodeURIComponent(result[2]) : null;  // 对参数解码 因为传过来时有编码
    },
    //渲染HTML（把传入的数据和模板进行拼接）
    renderHtml:function (htmlTemplate,data) {
        var template = hogan.compile(htmlTemplate),  //先编译
            result = template.render(data);   // 在渲染
        return result;
    },
    // 成功提示 success
    successTips:function (msg) {
      alert(msg || "操作成功");  // 如果不传值则提示操作成功
    },
    // 错误提示 success
    errorTips:function (msg) {
        alert(msg || "操作有误");  // 如果不传值则提示操作成功
    },
    //表单验证  type=phonenumer/email/"非空"
    validate:function(value,type){
        var value = $.trim(value);  // 去除空格 还有 转化为字符串
        //非空验证
        if ("require" == type){
            return !!value;  // value强转为Boolean  有值为true 空则为false
        }
        //密码验证
        if('password' === type){
            return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value);
        }
        //邮箱验证
        if ("email" == type)
        {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //强制登录(在转向登录界面时 也传入前一个页面（当前路径的页面） 以备登录之后转回)
    doLogin:function () {
        window.location.href="./login.html?redirect"+ encodeURIComponent(window.location.href);
    },
    // 统一跳转到home
    goHome: function () {
        window.location.href="./index.html";
    }
};
module.exports=_mm;
