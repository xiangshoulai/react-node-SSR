import webpack from "webpack";
import baseConfig from "./webpack.config";
import webpackMerge from "webpack-merge";
import getProjectUrl from "../src/common/helpers";
// import babelrc from "./babelrc";
// 注意这个引入的坑，最新版的需要这样引入，而不是直接const CleanWebpackPlugin
// import { CleanWebpackPlugin } from "clean-webpack-plugin"
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack.config.js做出更改
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

import config from "./index";

const uglify = require('uglifyjs-webpack-plugin');

const configWebpack: webpack.Configuration = {
    mode: "production",
    // devtool: "nosources-source-map",
    entry: {
        index: ["./src/index.tsx", "./src/sass/index.scss"]
    },
    output: {
        path: getProjectUrl("public/"),
        filename: "js/[name]_[contenthash:8].js",
        chunkFilename: "js/[name]_[contenthash:8].js",
        publicPath: config.public_path
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /(node_modules)/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../public/css/[name]_[contenthash:8].css",
            chunkFilename: "../public/css/[id]_[contenthash:8].css",
        }),
        new uglify()//js压缩
    ],
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    }
}

module.exports = webpackMerge(configWebpack, baseConfig);