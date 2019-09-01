import Koa from "koa";
import routers from "koa-router";
import cors from "koa2-cors";
import views from "koa-views";//模板处理
import serve from "koa-static";//静态资源处理
import path from "path";

import * as React from "react";
import { StaticRouter } from "react-router-dom";
import { StaticRouterContext, matchPath } from "react-router";
// import Loadable from "react-loadable";

import { SetRoute, RoutesArray } from "../route/index"
import configureStore from "../store/index"

import * as ReactDOMServer from "react-dom/server"
import { Provider } from 'react-redux';
// 配置
import baseCofig from '../../config';

import { MetaTagsContext } from 'react-meta-tags';

// const MetaTagsContext = require("react-meta-tags");
// const MetaTagsServer = require("react-meta-tags/server");
import MetaTagsServer from 'react-meta-tags/server';

// import { nextTick, async } from 'q';

const app = new Koa();

const appRouter = new routers();

const staticServer = serve(path.resolve("./dist/client/"));


// app.use(bodyParser);
// app.use(cookieParser);
// app.use(compress())
// 配置模版引擎中间件
// 如果这样配置不修改html后缀g改成ejs
app.use(views(path.resolve('./dist/server/tpl/'), { extension: "ejs" }));
app.use(staticServer);

app.use(cors({
    origin: (ctx) => {
        // console.log(ctx.URL);
        return "*";
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    allowMethods: ["GET", "POST", "DELETE"],
    credentials: true,
    allowHeaders: [
        // 需要获取其他字段时，使用Access-Control-Expose-Headers，
        // getResponseHeader('myData')可以返回我们所需的值
        'Content-Type',
        'Authorization',
        'Accept',
        'Expires',
        'Last-Modified',
    ],
    maxAge: 5
}))

// let _route = null, _match = null;

// router.list.some(route => {
//     let match = matchPath(req.url.split('?')[0], route);
//     if (match && match.path) {
//         _route = route;
//         _match = match;
//         return true;
//     }
// });

appRouter.get("*", async function (ctx) {
    const context: StaticRouterContext = {
        statusCode: 200
    }

    let _route = {
        component: {
            preload: () => { }
        },
        loadData: null
    }, _match = null;
    RoutesArray.some((item: any) => {
        let match = matchPath(ctx.url.split('?')[0], item);
        if (match && match.path) {
            _route = item;
            _match = match;
            return true;
        } else {
            return false;
        }
    });

    if (_route.loadData) {
        // context = await _route.loadData({});
    }

    _route.component.preload();

    // const _Router = Routes;

    const metaTagsInstance = MetaTagsServer();
    const store = configureStore();

    let _mainContent = (
        <Provider store={store}>
            <MetaTagsContext extract={metaTagsInstance.extract}>
                <StaticRouter location={ctx.url} context={context}>
                    <SetRoute />
                </StaticRouter>
            </MetaTagsContext>
        </Provider>
        // <div>ssss</div>
    );
    let html = ReactDOMServer.renderToString(_mainContent);

    // 获取页面的meta，嵌套到模版中
    let meta = metaTagsInstance.renderToString();

    let reduxState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');

    if (context.statusCode == 302) {
        ctx.header(302, {
            Location: context.url,
        });
    } else {
        ctx.status = 200;

        await ctx.render('index', { html, reduxState, meta });
        // ctx.body = ('../dist/server/tpl/index.ejs', { html, reduxState, meta });
    }
})


app.use(appRouter.routes());
app.use(appRouter.allowedMethods());

app.listen(baseCofig.port);

console.log('server started on port ' + baseCofig.port);
