/*
* @Author: Rosen
* @Date:   2017-05-08 15:28:19
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-30 16:50:46
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
// webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'login': ['./src/page/login/index.js'],
        'index': ['./src/page/index/index.js'],
        'welcome': ['./src/page/welcome/index.js'],
        'user-list': ['./src/page/user-list/index.js'],
        'user-add': ['./src/page/user-add/index.js'],
        'book-list': ['./src/page/book-list/index.js'],
        'book-add': ['./src/page/book-add/index.js'],
    },
    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('login', '后台用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('index', '后台主页')),
        new HtmlWebpackPlugin(getHtmlConfig('welcome', '欢迎页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-list', '用户列表')),
        new HtmlWebpackPlugin(getHtmlConfig('user-add', '新增用户')),
        new HtmlWebpackPlugin(getHtmlConfig('book-list', '书籍列表')),
        new HtmlWebpackPlugin(getHtmlConfig('book-add', '新增书籍')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8089/');
}

module.exports = config;