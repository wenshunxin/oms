var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");
var path = require('path');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';
config.plugins=[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: "app/index/index.html",
        inject: true
    }),
    new CommonsChunkPlugin({
        name: 'js/vendor',
        minChunks: Infinity
    })
]
// 动态向入口配置中注入 webpack-hot-middleware/client
var devClient = './dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
});
// console.log(config.entry);
module.exports = config;
