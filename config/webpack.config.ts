import webpack from "webpack";
import getStyleLoader from "./getStyleLoader"
import getProjectUrl from "../src/common/helpers";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";
import StyleLintPluginfrom from "stylelint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";

var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var chalk = require("chalk");

import config from "../config/index";

// interface EnvMap {
//     build: string;
//     dist: string;
//     development: string;
//     [key: string]: string;
// }

// const devMode: boolean = (process.env.NODE_ENV as keyof EnvMap) === 'development';

// const tsconfig = getProjectUrl(`tsconfig.${process.env.NODE_ENV === 'dist' ? 'dts.' : ''}json`);
const configWebpack: webpack.Configuration = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
        alias: {
            '@': getProjectUrl('src')
        },
    },
    // devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/, //正则表达式匹配图片规则
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, //限制打包图片的大小：
                            //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                            name: 'images/[name]-[hash:8].[ext]', //images:图片打包的文件夹；
                            //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                            //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                        },
                    },
                ],
            },

            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            },
            {
                test: /\.s?([ac])ss$/,
                exclude: /(node_modules)/,
                use: getStyleLoader(),
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            __SERVER__: 'false',
            __CLIENT__: 'true',
        }),
        //样式打包检测
        new StyleLintPluginfrom({
            configFile: getProjectUrl('stylelint.config.js'),
            context: getProjectUrl(),
            files: ['**/*.scss'],
            failOnError: false,
            emitErrors: true,
            syntax: 'scss',
            quiet: false,
        }),
        // 创建视图模版文件，给server使用
        // 主要是打包后的添加的css、js静态文件路径添加到模版中
        new HtmlWebpackPlugin({
            filename: getProjectUrl("dist", 'server/tpl/index.ejs'),
            template: 'src/view/index.html',
            metaDom: '<%- meta %>',
            htmlDom: '<%- html %>',
            reduxState: '<%- reduxState %>',
            head: config.head,
            // inject: false
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' +
                chalk.green.bold(':percent') +
                ' (:elapsed seconds)',
            clear: false,
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all" //所有的 chunks 代码公共的部分分离出来成为一个单独的文件
        },
        usedExports: true,//清除js中无用的代码，只对import的方式有效
        minimizer: [new OptimizeCssAssetsPlugin()],
    }
}

export default configWebpack;