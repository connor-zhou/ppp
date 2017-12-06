const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path-extra');
const fs = require('fs');

const ENV = process.env.NODE_ENV = process.env.ENV = 'dev';
const appConfig = JSON.parse(fs.readFileSync('./config/app.json'));
const logConfig = JSON.parse(fs.readFileSync('./config/log.json'));
const fqaConfig = JSON.parse(fs.readFileSync('./config/fqa.json'));

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path:  path.resolve(__dirname, 'dist'),
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
                'fqaConfig':JSON.stringify(fqaConfig),
                'logConfig':logConfig
            }
        })
    ],

    devServer: {
        stats: 'minimal',
        contentBase:'./',

        disableDotRule:true
    }
});