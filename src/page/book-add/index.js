/**
 * @author HB
 * @date 2018/6/18
 * @fileName index.js
 * @Description:  新增书籍js
*/
/*引入自身css*/
"use strict";
require("./index.css");
/*引用工具类 _mm*/
var _mm = require("util/mm");
/*引入userservice*/
var _book = require("service/bookService");
/*引入分类模板*/
var tempCategory = require("./category.string");
/*引入文件上传*/
require("util/imageUpload/imageUpload");
require("util/imageUpload/imageUpload.css");
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
        this.loadCategory();
    },
    bindEvent: function () {
        var _this = this;
        // 进行ISBN验证
        $("#bookIsbn").blur(function () {
            var bookIsbn = $.trim($("#bookIsbn").val());
            if (!bookIsbn){
                return;
            }
            // 异步验证ISBN是否存在
            _book.checkbookISBN(bookIsbn,function (data,res) {
                console.log(res)
                formError.hide();
            },function (errMsg) {
                console.log(errMsg)
                formError.show(errMsg);
            });
        });
        // 书籍封面的上传
        this.uploadBookImage();
        //添加书籍提交
        $("#add-book-btn").click(function(e){
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
            bookName:$.trim($("#bookName").val()),
            bookWriter:$.trim($("#bookWriter").val()),
            bookTranster:$.trim($("#bookTranster").val()),
            categoryId:$.trim($("#categoryId").val()),
            bookScore:$.trim($("#bookScore").val()),
            bookIsbn:$.trim($("#bookIsbn").val()),
            bookPublish:$.trim($("#bookPublish").val()),
            bookInfo:$.trim($("#bookInfo").val()),
            bookWriterInformation:$.trim($("#bookWriterInformation").val())
        };
        //表单验证返回结果
        var validateResult = this.formValidate(formData);
        if (validateResult.status) {
            if (formData.categoryId == 0){
                formError.show("分类不能为空")
            }else {
                _book.saveDo(formData, function (data, msg) {
                    layer.msg(msg);
                    // 2s之后自动关闭
                    setTimeout(function () {
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.$('#add-user-btn').click();
                        parent.layer.close(index);
                    }, 2000);
                }, function (errorMsg) {
                    formError.show(errorMsg);
                });
            }
        }else{
            formError.show(validateResult.msg);
        }
    },
    // 书籍封面上传
    uploadBookImage: function(){
        $("#upload-btn").on("click",function () {
            var data = {
                bookName:$.trim($("#bookName").val()),
                categoryId:$.trim($("#categoryId").val()),
                bookIsbn:$.trim($("#bookIsbn").val()),
            };
            console.log(data);
            var upload_img = $("#upload-img").prop("files")[0];
            if (upload_img == undefined){
                layer.msg("你还没选择要上传的封面哦");
                return;
            }else if (data.bookName == "" || data.categoryId == 0 || data.bookIsbn == "") {
                layer.msg("先填上面的选项哦");
                return;
            }else {
                var formData = new FormData();
                formData.append("upload_img",upload_img);
                formData.append("bookName",data.bookName);
                formData.append("categoryId",data.categoryId);
                formData.append("bookIsbn",data.bookIsbn);
                _book.uploadBookImg(formData,function (data,res) {
                    layer.msg(res);
                },function (errMsg) {
                    layer.msg(errMsg);
                });
            }
        });
    },
    // 加载分类信息
    loadCategory:function(){
        var categoryHtml = "";
        _book.getCategoryList(function (data) {
            categoryHtml = _mm.renderHtml(tempCategory,{
                categoryList:data
            });
            $("#categoryId").html(categoryHtml);
        })
    },
    formValidate:function(formData){
        var result = {
            status:false,
            msg:""
        };
        if (!_mm.validate(formData.bookName,"require")){
            result.msg = "书名不能为空";
            return result;
        }
        if (!_mm.validate(formData.bookWriter,"require")){
            result.msg = "作者不能为空";
            return result;
        }
        if (!_mm.validate(formData.bookIsbn,"require")){
            result.msg = "书籍ISBN不能为空)";
            return result;
        }
        if(!_mm.validate(formData.bookPublish, 'require')){
            result.msg = '出版社不能为空';
            return result;
        }
        if(!_mm.validate(formData.bookInfo, 'require')){
            result.msg = '书籍信息不能为空';
            return result;
        }
        if (!_mm.validate(formData.bookWriterInformation,"require")){
            result.msg = "作者信息不能空";
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