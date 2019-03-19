/**
 * @author Qiuql
 * @date 2019/3/14
 * @fileName commentService.js
 * @Description:  评论管理逻辑
*/
/*引用工具类*/
var _mm = require("util/mm");
var _comment = {
    // 得到当前评论列表
    getCommentList: function (listParam,resolve,reject) {
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/comment/get_comment_list.do"),
            method:"POST",
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 删除评论
    deleteComment: function (commentId,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/comment/delete_comment.do"),
            method: "POST",
            data: commentId,
            success: resolve,
            reject: reject
        });
    },
}
module.exports = _comment;