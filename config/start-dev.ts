
import * as config from './webpack.config.dev';
import webpack from 'webpack';

// 创建编译时配置
// const devConfig = new WebpackConfig('development');
// 通过watch来实时编译
webpack(config).watch({
    aggregateTimeout: 300
}, (err: Error) => {
    console.log(err);
});