import webpack from "webpack";
// import path from "path";
import getProjectUrl from "../src/common/helpers";
import baseConfig from "./webpack.config";
import webpackMerge from "webpack-merge";
// import babelrc from "./babelrc";
// 注意这个引入的坑，最新版的需要这样引入，而不是直接const CleanWebpackPlugin
// import { CleanWebpackPlugin } from "clean-webpack-plugin"
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack.config.js做出更改
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import StyleLintPluginfrom from "stylelint-webpack-plugin";
// import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

import config from "../config/index"

// const PurifyCSS = require("purifycss-webpack");
// const glob = require("glob-all");

const configWebpack: webpack.Configuration = {
    mode: "development",
    target: "web",
    devtool: "source-map",
    entry: {
        app: ["./src/index.tsx", "./src/sass/index.scss"]
    },
    output: {
        filename: "[name]_[contenthash:8].js",
        path: getProjectUrl('dist/client/'),
        chunkFilename: "[name]_[contenthash:8].js",
        publicPath: config.local_path,
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',

                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            configFile: getProjectUrl('.eslintrc.js'),
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id]_[contenthash:8].css",
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all" //所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
        usedExports: true,//清除js中无用的代码，只对import的方式有效
        // minimizer: [new OptimizeCssAssetsPlugin()]
    }
}


module.exports = webpackMerge(configWebpack, baseConfig);