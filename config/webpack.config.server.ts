import webpack from "webpack";

import webpackMerge from "webpack-merge";
import webpackNodeExternals from "webpack-node-externals";

import HtmlWebpackPlugin from "html-webpack-plugin";
// import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
// import StyleLintPluginfrom from "stylelint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import config from "./index";
import getProjectUrl from "../src/common/helpers";
import getStyleLoader from "../config/getStyleLoader";
import baseConfig from "./webpack.config";

import path from "path";

var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require("chalk");


// const nodeExternals = require('webpack-node-externals');
// import babelrc from "./babelrc";
// 注意这个引入的坑，最新版的需要这样引入，而不是直接const CleanWebpackPlugin
// import { CleanWebpackPlugin } from "clean-webpack-plugin"
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack.config.js做出更改
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import StyleLintPluginfrom from "stylelint-webpack-plugin";
// import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
// import autoprefixer from "autoprefixer";

// import cssnano from 'cssnano';

// import pxtorem from "postcss-pxtorem";
// const pxtorem = require("postcss-pxtorem")

// const PurifyCSS = require("purifycss-webpack");
// const glob = require("glob-all");

const Mode = process.env.NODE_ENV == "development";

const configWebpack: webpack.Configuration = {
    mode: "development",
    name: "srr",
    target: "node",
    devtool: "source-map",
    entry: {
        app: ["./src/server/index"],
    },
    output: {
        filename: "[name].js",
        path: getProjectUrl('dist/server/'),
        libraryTarget: 'commonjs2',
        chunkFilename: '[name].[contenthash:8].js',
        libraryExport: 'default',
        publicPath: config.public_path,
    },
    module: {
        rules: [{
            test: /\.(j|t)sx?$/,
            exclude: /(node_modules)/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        // 加快编译速度
                        transpileOnly: true,
                        // 指定特定的ts编译配置，为了区分脚本的ts配置
                        configFile: getProjectUrl('./tsconfig.json')
                    }
                }
            ],
        },
        ]
    },
    externals: [webpackNodeExternals({
        whitelist: /\.css$/,
    })],
    plugins: [
        new MiniCssExtractPlugin({
            filename: "../../dist/client/css/[name]_[contenthash:8].css",
            chunkFilename: "../../dist/client/css/[id]_[contenthash:8].css",
        })
    ]
}


export default webpackMerge(baseConfig, configWebpack);