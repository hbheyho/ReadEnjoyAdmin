/**
* 2018-05-16 09:01:06
* 作者:HB
* 文件名:userService.js
* 描述:  用户登录逻辑
*/
/*引用工具类*/
var _mm = require("util/mm");
var _user = {
    /*用户登录*/
    login:function (userInfo,resolve,reject) {
        _mm.requestAboutSeeion({
           url : _mm.getServerUrl("http://localhost:8080/manage/user/login.do"),
           data: userInfo,
           method: "post",
           success: resolve,
           error: reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.requestAboutSeeion({
            url     : _mm.getServerUrl("http://localhost:8080/user/get_user_info.do"),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    /*检查用户名*/
    checkUsername:function (username,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl("http://localhost:8080/user/check_valid.do"),
            data: {
                type: "username",
                str: username
            },
            method: "post",
            success: resolve,
            error: reject
        })
    },
    /*检查email*/
    checkEmail:function (email,resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl("http://localhost:8080/user/check_valid.do"),
            data: {
                type: "email",
                str: email
            },
            method: "post",
            success: resolve,
            error: reject
        })
    },
    /*得到用户信息*/
    getUserInfo : function (resolve,reject) {
        _mm.requestAboutSeeion({
           url: _mm.getServerUrl("http://localhost:8080/user/get_information.do"),
           method: "post",
           success: resolve,
           error: reject
        });
    },
    /*更新用户信息*/
    updateUserInfo : function (userInfo,resolve,reject) {
        _mm.requestAboutSeeion({
           url: _mm.getServerUrl("http://localhost:8080/user/update_information.do"),
           data: userInfo,
           method: "post",
           success: resolve,
           error: reject
        });
    },
    /*登录状态下 修改密码*/
    updatePassword : function (userInfo,resolve,reject) {
        _mm.requestAboutSeeion({
           url: _mm.getServerUrl("http://localhost:8080/user/reset_password.do"),
           data: userInfo,
           method: "post",
           success: resolve,
           error: reject
        });
    },
    /*退出登录*/
    logout : function (reslove,reject) {
        _mm.requestAboutSeeion({
            url: _mm.getServerUrl("http://localhost:8080/user/logout.do"),
            method: "post",
            success: reslove,
            error: reject
        });
    },
    // 用户头像上传
    uploadImg: function (file,resolve,reject) {
        _mm.requestAboutFile({
            url:_mm.getServerUrl("http://localhost:8080/user/upload_img.do"),
            method:"POST",
            data:file,
            success: resolve,
            error: reject
        });
    },
    // 得到当前用户列表
    getUserList: function (listParam,resolve,reject) {
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/user/get_user_list.do"),
            method:"POST",
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 增加用户
    addUser: function(user,resolve,reject){
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/user/add_user.do"),
            method:"POST",
            data: user,
            success: resolve,
            error: reject
        });
    },
    // 删除用户
    deleteUser: function (userId,resolve,reject) {
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/user/delete_user.do"),
            method:"POST",
            data: userId,
            success: resolve,
            error: reject
        });
    },
    // 更新用户状态
    modifyUserStatus: function (userId,resolve,reject) {
        _mm.requestAboutSeeion({
            url:_mm.getServerUrl("http://localhost:8080/manage/user/modify_user_status.do"),
            method:"POST",
            data: userId,
            success: resolve,
            error: reject
        });
    }
}
module.exports = _user;
