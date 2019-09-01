const config = {
  // 服务端口
  port: 3000,

  analyzerPort: 3002,

  // 登录token，cookie 的名称
  auth_cookie_name: 'signin-cookie',

  // https://github.com/css-modules/css-modules
  class_scoped_name: '[hash:base64:8]',

  // 前端打包后，线上静态资源域名
  // 生成效果如：//localhost:4000/app.bundle.js
  public_path: '//localhost:3000/',
  //本地静态资源地址，用于开发
  local_path: '//localhost:3000/',

  title: '首页', // 网站标题

  favicon: '<link rel="icon" href="/favicon.ico" />',

  // 添加内容到模版的head中
  head: `
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
  `,
  debug: false
}
// / 开发环境配置
if (process.env.NODE_ENV == 'development') {
  config.debug = true
  config.class_scoped_name = '[name]_[local]__[hash:base64:5]'
}

export default config;