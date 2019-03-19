/**
 * @author Qiuql
 * @date 2019/3/14
 * @fileName feedbackService.js
 * @Description:  反馈管理逻辑
*/
/*引用工具类*/
var _mm = require("util/mm");
var _feedback = {
    // 得到当前反馈列表
    getFeedbackList: function (listParam,resolve,reject) {
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/feedback/get_feedback_list.do"),
            method:"POST",
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 删除举报
    deleteFeedback: function (feedbackId,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/feedback/delete_feedback.do"),
            method: "POST",
            data: feedbackId,
            success: resolve,
            reject: reject
        });
    },
    // 处理举报
    modifyFeedbackSatus: function (dealParam,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/feedback/deal_feedback.do"),
            method: "POST",
            data: dealParam,
            success: resolve,
            reject: reject
        });
    },
}
module.exports = _feedback;