var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path-extra');
var fs = require('fs');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var appConfig = JSON.parse(fs.readFileSync(__dirname+'/config/app.build.json'));
var logConfig = JSON.parse(fs.readFileSync(__dirname+'/config/log.build.json'));
const fqaConfig = JSON.parse(fs.readFileSync('./config/fqa.build.json'));
module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: appConfig.baseURL,
        filename: '[name].[hash].js',
        chunkFilename: 'js/[id].[hash].chunk.js'
    },


    plugins: [
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!app/_index-webpack.html',
            baseURL: appConfig.baseURL
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'appConfig':JSON.stringify(appConfig),
                'fqaConfig':JSON.stringify(fqaConfig),
                'logConfig':logConfig
            }
        })
    ]
});