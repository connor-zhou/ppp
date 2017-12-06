const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanCSSPlugin = require("less-plugin-clean-css");
module.exports = {

    resolve: {
        enforceModuleExtension: false,
        extensions: ['.ts', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader','angular2-load-children-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css-loader?sourceMap!less-loader?sourceMap')
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?[\s\S]+)?$/,
                loader: 'file-loader?name=images/[name].[hash].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['js/app', 'js/vendor', 'js/polyfills']
        }),
        new ExtractTextPlugin('css/[name].[hash].css'),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};
