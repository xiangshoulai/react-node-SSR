import webpack from 'webpack';
import base from './webpack.config';
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
import getProjectUrl  from '../src/common/helpers';

import { CleanWebpackPlugin } from "clean-webpack-plugin";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import StyleLintPluginfrom from "stylelint-webpack-plugin";

// 使用 awesome-typescript-loader 插件打包 tsx，文件无法生成类型文件
// https://github.com/s-panferov/awesome-typescript-loader/issues/411
// import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
// import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import webpackMerge from 'webpack-merge';

import config from "../config/index"

const configWebpack: webpack.Configuration = {
    mode: 'development',
    devServer: {
        stats: {
            colors: true, //增加控制台颜色开关stats
            modules: false, // 不增加内置模块信息
            children: false, // 不增加子级信息 If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false, // 允许较少的输出
            chunkModules: false, // 不将内置模块的信息加到包信息
        },
        hot: true,
        host: "0.0.0.0",
        contentBase: getProjectUrl("src"),
        port: 9090,
        historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        // port: 80,
        // open: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        disableHostCheck: true,
        // 如果不启用无法使用 BrowserRouter
        // historyApiFallback: true
    },
    entry: {
        index: getProjectUrl('src', 'index.tsx'),
        // css: getProjectUrl('src', "sass/index.scss")
    },
    output: {
        filename: "[name]_[hash:8].js",
        path: getProjectUrl('dist/client/'),
        chunkFilename: "[name]_[hash:8].js",
        publicPath: config.public_path,
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
                    // {
                    //     loader: 'eslint-loader',
                    //     options: {
                    //         configFile: getProjectUrl('.eslintrc.js'),
                    //     },
                    // },
                ],
            }
        ]
    },
    
    plugins: [
        new CleanWebpackPlugin(),//清除之前的文件
        new webpack.HotModuleReplacementPlugin(),//热启动 与hot配合使用
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id]_[contenthash:8].css",
        }),
        new StyleLintPluginfrom({
            configFile: getProjectUrl('stylelint.config.js'),
            context: getProjectUrl(),
            files: ['**/*.scss'],
            failOnError: false,
            emitErrors: true,
            syntax: 'scss',
            quiet: false,
        }),
    ],
};

module.exports = webpackMerge(base, configWebpack);
