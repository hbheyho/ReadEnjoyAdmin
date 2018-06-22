/**
 * @author HB
 * @date 2018/6/16
 * @fileName bookService.js
 * @Description:  书籍处理逻辑
*/
/*引用工具类*/
var _mm = require("util/mm");
var _book = {
    // 得到当前书籍列表
    getBookList: function (listParam,resolve,reject) {
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/book/list.do"),
            method:"POST",
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 保存以及更新书籍
    saveDo: function (bookInfo,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/book/save.do"),
            method: "POST",
            data: bookInfo,
            success: resolve,
            reject: reject
        });
    },
    // 得到书籍详情信息
    getBookDetai: function (bookISBN,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/book/detail.do"),
            method: "POST",
            data: bookISBN,
            success: resolve,
            reject: reject
        });
    },
    // 删除书籍
    deleteBook: function (bookId,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/book/delete.do"),
            method: "POST",
            data: bookId,
            success: resolve,
            reject: reject
        });
    },
    // 修改书籍状态
    modifyBookSatus: function (bookId,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/book/modify_status.do"),
            method: "POST",
            data: bookId,
            success: resolve,
            reject: reject
        });
    },
    // 得到书籍的分类
    getCategoryList: function (resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/category/get_deep_category.do"),
            method: "POST",
            success: resolve,
            reject: reject
        });
    },
    // ISBN验证
    checkbookISBN: function (bookIsbn,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/book/check_bookIsbn.do"),
            method: "POST",
            data:{
              bookIsbn:bookIsbn
            },
            success: resolve,
            error: reject
        });
    },
    // 上传图片封面
    uploadBookImg: function (file,resolve,reject) {
        _mm.requestAboutFile({
            url:_mm.getServerUrl("http://localhost:8080/manage/book/upload_img.do"),
            method:"POST",
            data:file,
            success: resolve,
            error: reject
        });
    },
}
module.exports = _book;