/**
 * @author HB
 * @date 2018/6/18
 * @fileName index.js
 * @Description:  书籍js
*/
/*引入自身css*/
require("./index.css");
/*引用工具类 _mm*/
var _mm = require("util/mm");
/*引入工具类 util*/
var _util = require("util/util");
/*引入userservice*/
var _book = require("service/bookService");
/*引入分页组件*/
var Pagination = require('util/pagination/index.js');
/*引入booklist模板*/
var tempBookList = require("./bookList.string");
var page = {
    // 规定分页页数以及分页大小
    data: {
        listParam: {
            pageNum:  1,
            pageSize:  5
        }
    },
    init: function () {
        // 加载书籍列表信息
        this.loadBookList();
        this.bindEvent();
    },
    bindEvent: function () {
        this.addBook();
        this.stopBook();
        this.startBook();
    },
    // 加载书籍列表信息
    loadBookList: function () {
        // 进行模板以及数据初始化
        var _this = this,
            bookListHtml = "",
            listParam = this.data.listParam;
        _book.getBookList(listParam,function (data) {
            // 进行list模板渲染(userList渲染)
            bookListHtml = _mm.renderHtml(tempBookList,{
                bookList: data.list
            });
            console.log(data);
            $("#book-list").html(bookListHtml);
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
            var totalHtml = "<span  style='padding-top: 3px;' class=\"r\">共有数据：<strong>{{bookTotal}}</strong> 条</span>";
            totalHtml = _mm.renderHtml(totalHtml,{
                bookTotal: data.total
            });
            $("#book-total").html(totalHtml);
            // 编辑书籍
            _this.editBook();
            // 删除书籍
            _this.deleteBook();
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
                _this.loadBookList();
            }
        }))
    },
    // 添加新书籍
    addBook: function(){
        $("#add-book").on("click",function () {
            /*新用户-添加*/
            _util.layer_show('添加新书', 'book-add.html', '', '510');
        });
    },
    //书籍下架
    stopBook: function () {
        $("body").on("click",".stop-book",function () {
            var _this = this;
            layer.confirm('确认要下架吗？',function(){
                var bookId = $(_this).parents(".td-manage").prevAll(".book-number").text();
                _book.modifyBookSatus({
                    bookId: bookId
                },function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
                $(_this).parent(".status-content").html('<a style="text-decoration:none" class="start-book" href="javascript:;" title="上架"><i class="fa fa-check-circle-o"></i></a>');
                $(".start-book").parents(".td-manage").prev(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
                $(this).remove();
                layer.msg('已下架',{icon: 5,time:1000});
            });
        });
    },
    // 上架书籍
    startBook: function () {
        $("body").on("click",".start-book",function () {
            var _this = this;
            layer.confirm('确认要上架吗？',function(){
                var bookId = $(_this).parents(".td-manage").prevAll(".book-number").text()
                _book.modifyBookSatus({
                    bookId: bookId
                },function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
                $(_this).parent(".status-content").html('<a style="text-decoration:none" class="stop-book" href="javascript:;" title="下架"><i class="fa fa-minus-circle"></i></a>');
                $(".stop-book").parents(".td-manage").prev(".td-status").html('<span class="label label-success radius">已上架</span>');
                $(this).remove();
                layer.msg('已启用',{icon: 6,time:1000});
            });
        });
    },
    // 删除书籍
    deleteBook: function () {
        $(".delete-book").on("click",this,function () {
            var _this = this;
            layer.confirm('确认要删除吗？',function(){
                var bookId = $(_this).parent(".td-manage").prevAll(".book-number").text();
                _book.deleteBook({
                    bookId: bookId
                },function (data,msg) {
                    layer.msg(msg)
                },function (errMsg) {
                    layer.msg(errMsg)
                });
            });
        });
    }, // 编辑用户
    editBook: function () {
        $(".edit-book").on("click",this,function () {
            var index = layer.open({
                type: 2,
                title: "编辑",
                content: "book-add.html",
            });
            layer.full(index);
        });
    }
}
$(function () {
    page.init();
});