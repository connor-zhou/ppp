const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanCSSPlugin = require("less-plugin-clean-css");
module.exports = {
    entry: {
        'js/polyfills': './app/scripts/boot/polyfills.ts',
        'js/vendor': './app/scripts/boot/vendor.ts',
        'js/app': './app/scripts/boot/main.ts'
    },

    resolve: {
        enforceModuleExtension: false,
        extensions: ['.ts', '.js']
    },

    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader','angular2-load-children-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[{loader:'css-loader',options:{sourceMap:true,minimize: true}}]
                })
            },

            { test: /\.less$/,
              use:[
               "raw-loader",
                {
                 loader: "less-loader",
                 options: {
                    plugins: [
                        new CleanCSSPlugin({ advanced: true })
                    ]}
                }
              ]
            },
            {
                test: /\.(png|jpg|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?[\s\S]+)?$/,
                use: 'file-loader?name=images/[name].[hash].[ext]'
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
            jquery: 'jquery',
            echarts: "echarts"
        })
    ]
};
