/**
 * @author qiuql
 * @date 2019/3/14
 * @fileName 反馈管理.js
 * @Description:  反馈管理js
*/
/*引入自身css*/
require("./index.css");
/*引用工具类 _mm*/
var _mm = require("util/mm");
/*引入工具类 util*/
var _util = require("util/util");
/*引入commentservice*/
var _feedback = require("service/feedbackService");
/*引入分页组件*/
var Pagination = require('util/pagination/index.js');
/*引入booklist模板*/
var tempFeedbackList = require("./feedbackList.string");
var page = {
    // 规定分页页数以及分页大小
    data: {
        listParam: {
            pageNum:  1,
            pageSize:  12
        },
        dealParam: {
            status: 0,
            feedbackId: ''
        }
    },
    init: function () {

        // 加载书籍列表信息
        this.loadFeedbackList();

        this.bindEvent();
    },
    bindEvent: function () {
        this.handlerStatus();
    },
    // 加载反馈列表信息
    loadFeedbackList: function () {
        // 进行模板以及数据初始化
        var _this = this,
            feedbackListHtml = "",
            listParam = this.data.listParam;
        _feedback.getFeedbackList(listParam,function (data) {
            // 进行list模板渲染(commentList渲染)
            feedbackListHtml = _mm.renderHtml(tempFeedbackList,{
                feedbackList: data.list
            });


            $("#feedback-list").html(feedbackListHtml);
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
            var totalHtml = "<span  style='padding-top: 3px;' class=\"r\">共有数据：<strong>{{feedbackTotal}}</strong> 条</span>";
            totalHtml = _mm.renderHtml(totalHtml,{
                feedbackTotal: data.total
            });
            $("#feedback-total").html(totalHtml);
            // 删除反馈
            _this.deleteFeedback();
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
                _this.loadFeedbackList();
            }
        }))
    },
    // 删除反馈
    deleteFeedback: function () {
        $(".delete-feedback").on("click",this,function () {
            var _this = this;
            layer.confirm('确认要删除吗？',function(){
                var feedbackId = $(_this).parent(".td-manage").prevAll(".feedback-number").text();
                _feedback.deleteFeedback({
                    feedbackId: feedbackId
                },function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
            });
        });
    }, 
    // 更改状态
    handlerStatus: function () {
        $("body").on("click",".change-status",function () {
            var _this = this;
                 
                
            layer.confirm('已处理此举报信息吗？',function(){
                var feedbackId = $(_this).parents(".td-manage").prevAll(".feedback-number").text();
                var status = $(_this).parents(".td-manage").prev(".td-status").children(".status").text();
                var dealParam = {
                    status: status,
                    feedbackId: feedbackId

                };
                _feedback.modifyFeedbackSatus(dealParam,function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
                $(_this).parents(".td-manage").prev(".td-status").html('<span class="label label-success radius">已处理</span>');
                $(_this).parent(".status-content").html('');
                $(this).remove();
                layer.msg('已处理',{icon: 6,time:1000});
            });
        });
    },
}
$(function () {
    page.init();
});