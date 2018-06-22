/**
 * @author HB
 * @date 2018/6/17
 * @fileName index.js
 * @Description:  用户列表js
*/
/*引入自身css*/
require("./index.css");
/*引用工具类 _mm*/
var _mm = require("util/mm");
/*引入工具类 util*/
var _util = require("util/util");
/*引入userservice*/
var _user = require("service/userService");
/*引入分页组件*/
var Pagination = require('util/pagination/index.js');
/*引入userlist模板*/
var tempUserList = require("./userList.string");
var page = {
    // 规定分页页数以及分页大小
    data: {
        listParam: {
            pageNum:  1,
            pageSize:  5
        }
    },
    init: function () {
        // 加载用户列表信息
        this.loadUserList();
        this.bindEvent();
    },
    bindEvent: function () {
        this.addUser();
        this.stopUser();
        this.startUser();
    },
    // 加载用户列表信息
    loadUserList: function () {
        // 进行模板以及数据初始化
        var _this = this,
            userListHtml = "",
            listParam = this.data.listParam;
        _user.getUserList(listParam,function (data) {
            // 进行list模板渲染(userList渲染)
            userListHtml = _mm.renderHtml(tempUserList,{
                userList: data.list
            });
            $("#user-list").html(userListHtml);
            // 加载分页并且配置一些选项
            _this.loadPagination({
                hasPreviousPage : data.hasPreviousPage,  // 是否有前一页
                hasNextPage     : data.hasNextPage,  // 是否有下一页
                prePage         : data.prePage,  // 前一页是多少
                nextPage        : data.nextPage,  // 下一页是多少
                pageNum         : data.pageNum,  // 当前第几页
                pages           : data.pages // 一共多少页
            });
                // 对用户总数进行添加
                var totalHtml = "<span  style='padding-top: 3px;' class=\"r\">共有数据：<strong>{{userTotal}}</strong> 条</span>";
                totalHtml = _mm.renderHtml(totalHtml,{
                    userTotal: data.total
                });
                $("#user-total").html(totalHtml);
            // // 编辑用户
            // _this.editUser();
            // 删除用户
            _this.deleteUser();
        },function (errMsg) {
            layer.msg(errMsg);
        })
    },
    // 加载分页
    loadPagination: function (pageInfo) {
        var _this = this;
        // 初始化组件
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({},pageInfo,{
            container:$(".pagination"),  // container jQuery容器
            // 用户选择之后的加载
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadUserList();
            }
        }))
    },
    // 添加新用户
    addUser: function(){
        $("#add-user").on("click",function () {
            /*新用户-添加*/
            _util.layer_show('添加新用户', 'user-add.html', '', '510');
        });
    },
    // 停用用户
    stopUser: function () {
        $("body").on("click",".stop-user",function () {
            var _this = this;
            layer.confirm('确认要停用吗？',function(){
                var userId = $(_this).parents(".td-manage").prevAll(".user-number").text();
                _user.modifyUserStatus({
                    userId: userId
                },function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
                $(_this).parent(".status-content").html('<a style="text-decoration:none" class="start-user" href="javascript:;" title="启用"><i class="fa fa-check-circle-o"></i></a>');
                $(".start-user").parents(".td-manage").prev(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
                $(this).remove();
                layer.msg('已停用',{icon: 5,time:1000});
            });
        });
    },
    // 启用用户
    startUser: function () {
        $("body").on("click",".start-user",function () {
            var _this = this;
            layer.confirm('确认要启用吗？',function(){
                var userId = $(_this).parents(".td-manage").prevAll(".user-number").text();
                _user.modifyUserStatus({
                    userId: userId
                },function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
                $(_this).parent(".status-content").html('<a style="text-decoration:none" class="stop-user" href="javascript:;" title="停用"><i class="fa fa-minus-circle"></i></a>');
                $(".stop-user").parents(".td-manage").prev(".td-status").html('<span class="label label-success radius">已启用</span>');
                $(this).remove();
                layer.msg('已启用',{icon: 6,time:1000});
            });
        });
    },
    // 删除用户
    deleteUser: function () {
        $(".delete-user").on("click",this,function () {
            var _this = this;
            layer.confirm('确认要删除吗？',function(){
                var userId = $(_this).parent(".td-manage").prevAll(".user-number").text();
                _user.deleteUser({
                    userId: userId
                },function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
            });
        });
    }
    // , // 编辑用户
    // editUser: function () {
    //     $(".edit-user").on("click",this,function () {
    //         var index = layer.open({
    //             type: 2,
    //             title: "编辑",
    //             content: "user-add.html",
    //         });
    //         layer.full(index);
    //     });
    // }
}
$(function () {
   page.init();
});