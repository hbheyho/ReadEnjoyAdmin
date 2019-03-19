/**
 * @author Qiuql
 * @date 2019/3/14
 * @fileName reportService.js
 * @Description:  举报管理逻辑
*/
/*引用工具类*/
var _mm = require("util/mm");
var _report = {
    // 得到当前举报列表
    getReportList: function (listParam,resolve,reject) {
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/report/get_report_list.do"),
            method:"POST",
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 删除举报
    deleteReport: function (reportId,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/report/delete_report.do"),
            method: "POST",
            data: reportId,
            success: resolve,
            reject: reject
        });
    },
    // 处理举报
    modifyReportSatus: function (dealParam,resolve,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/manage/report/deal_report.do"),
            method: "POST",
            data: dealParam,
            success: resolve,
            reject: reject
        });
    },
}
module.exports = _report;