const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./activity.webpack.common.js');
const path = require('path-extra');
const fs = require('fs');

const ENV = process.env.NODE_ENV = process.env.ENV = 'dev';
const appConfig = JSON.parse(fs.readFileSync('./config/app.json'));
const logConfig = JSON.parse(fs.readFileSync('./config/log.json'));
const activityConfig = JSON.parse(fs.readFileSync('./config/activity.json'));
const publicPath = appConfig.baseURL + 'activity/'+activityConfig.build + '/';

module.exports = webpackMerge(commonConfig, {
    entry: {
        'js/polyfills': './app/scripts/boot/polyfills.ts',
        'js/vendor': './app/scripts/boot/vendor.ts',
        'js/app': './activity/'+activityConfig.build+'/main.ts'//活动是需要一个个单独部署的
    },

    devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: appConfig.baseURL,
        filename: '[name].js',
        chunkFilename: 'js/[id].chunk.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!app/_index-webpack.html',
            baseURL: appConfig.baseURL
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'appConfig':JSON.stringify(appConfig),
                'logConfig':JSON.stringify(logConfig),
                'activityConfig':JSON.stringify(activityConfig)
            }
        })
    ],

    devServer: {
        stats: 'minimal',
        contentBase:'./',

        disableDotRule:true
    }
});