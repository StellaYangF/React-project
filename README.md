# 项目目标
系统学习和掌握React全家桶的实战应用，功能包括： 

- 1. 移动端布局
- 2. 头部导航
- 3. 用户注册
- 4. 用户权限
- 5. 用户注册
- 6. 用户登录
- 7. 轮播图
- 8. 课程列表和优化
- 9. 防抖节流
- 10. 购物车
- 11. 购物车动画

## 1. 项目简介
- 本项目是一个开发一个react+express的全栈项目


## 2. 搭建开发环境
- 首先我们要基于webpack搭建一个react开发环境

本节目录

```js
`-- client
    |-- package.json
    |-- src
    |   |-- index.html
    |   |-- index.tsx
    |-- tsconfig.json
    |-- webpack.config.js
```

### 2.1 初始化项目录
- 执行以下命令创建项目

```js
mkdir client
cd client
cnpm init -y
```

### 2.2 安装依赖
```js
//安装react相关的模块 
cnpm i react react-dom @types/react @types/react-dom react-router-dom @types/react-router-dom react-transition-group @types/react-transition-group react-swipe @types/react-swipe antd qs @types/qs  -S
//安装webpack相关的模块
cnpm i webpack webpack-cli webpack-dev-server html-webpack-plugin ts-import-plugin -D
//安装ts相关的模块
cnpm i typescript ts-loader source-map-loader style-loader css-loader less-loader less url-loader file-loader autoprefixer px2rem-loader postcss-loader lib-flexible -D
//安装redux相关的模块
cnpm i redux react-redux @types/react-redux redux-thunk  redux-logger @types/redux-logger redux-promise @types/redux-promise immer redux-immer -S
//安装路由相关的模块
cnpm i connected-react-router -S
```

|模块名|英文|中文|
|:----|:----|:----|
|react|React is a JavaScript library for creating user interfaces.|React是一个用于创建用户界面的JavaScript库|
|@types/react|This package contains type definitions for React|包含React的类型定义||
|react-dom|This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm|把React渲染到DOM上|
|@types/react-dom|This package contains type definitions for React (react-dom) |包含 React (react-dom)的类型定义||
|react-router-dom|DOM bindings for React Router|React路由的DOM渲染|
|@types/react-router-dom|This package contains type definitions for React Router|React Router的类型定义|
|react-transition-group|A set of components for managing component states (including mounting and unmounting) over time, specifically designed with animation in mind|一组用于随时间管理组件状态（包括安装和卸载）的组件，特别设计时考虑了动画|
|@types/react-transition-group|This package contains type definitions for react-transition-group|react-transition-group的类型定义|
|react-swipe|Brad Birdsall's Swipe.js as a React component|React轮播图组件|
|@types/react-swipe|This package contains type definitions for react-swipe|React轮播图组件的类型定义|
|antd|An enterprise-class UI design language and React UI library|企业级UI设计语言和React UI库||
|qs|A querystring parsing and stringifying library with some added security|一个带有一些附加安全性的querystring解析和字符串化库|
|@types/qs|This package contains type definitions for qs|该软件包包含qs的类型定义|
|webpack|webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.|webpack是一个模块打包器。它的主要目的是打包JavaScript文件以在浏览器中使用，但它也能够转换或打包几乎任何资源||
|webpack-cli|webpack CLI provides a flexible set of commands for developers to increase speed when setting up a custom webpack project. As of webpack v4, webpack is not expecting a configuration file, but often developers want to create a more custom webpack configuration based on their use-cases and needs. webpack CLI addresses these needs by providing a set of tools to improve the setup of custom webpack configuration.|webpack cli提供了一组灵活的命令，供开发人员在设置自定义webpack项目时提高速度|
|webpack-dev-server|Use webpack with a development server that provides live reloading. This should be used for development only|将webpack与提供实时重载的开发服务器一起使用。 这应该仅用于开发|
|html-webpack-plugin|Plugin that simplifies creation of HTML files to serve your bundles|简化HTML文件的创建插件|
|ts-import-plugin|Modular import plugin for TypeScript, compatible with antd, antd-mobile and so on|用于TypeScript的模块化导入插件，与antd，antd-mobile等兼容|
|typescript|TypeScript is a language for application-scale JavaScript|TypeScript是用于应用程序级JavaScript的语言|
|ts-loader|TypeScript loader for webpack|用于Webpack的TypeScript加载器|
|source-map-loader|Extracts source maps from existing source files (from their sourceMappingURL)|从现有源文件(从其sourceMappingURL)中提取源映射|
|style-loader|Inject CSS into the DOM|将CSS注入DOM|
|css-loader|The css-loader interprets @import and url() like import/require() and will resolve them|css-loader会像importt()/require()一样解释@import和url并将解析它们|把less编译成CSS|
|less-loader|A Less loader for webpack. Compiles Less to CSS|把less编译成CSS|
|less|This is the JavaScript, official, stable version of Less|这是Less的JavaScript官方稳定版本|
|url-loader|A loader for webpack which transforms files into base64 URIs|Webpack的加载程序，可将文件转换为base64 URI|
|file-loader|The file-loader resolves import/require() on a file into a url and emits the file into the output directory|将文件上的import()/require()解析为url并将文件写入到输出目录中|
|autoprefixer|PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. It is recommended by Google and used in Twitter and Alibaba|根据`can i use`网站的CSS规则给CSS规则添加厂商前缀|
|px2rem-loader|a webpack loader for px2rem|px2rem的Webpack加载器|
|postcss-loader|Loader for webpack to process CSS with PostCSS|用于webpack的Loader以使用PostCSS处理CSS|
|lib-flexible|可伸缩布局解决方案|
|redux|Redux is a predictable state container for JavaScript apps|Redux是JavaScript应用程序的可预测状态容器|
|react-redux|Official React bindings for Redux|Redux的官方React绑定|
|@types/react-redux|his package contains type definitions for react-redux|该软件包包含react-redux的类型定义|
|redux-thunk|Thunk middleware for Redux|用于Redux的Thunk中间件|
|redux-logger|Logger for Redux|用于Redux的logger中间件|
|@types/redux-logger|This package contains type definitions for redux-logger|该软件包包含redux-logger的类型定义|
|redux-promise|FSA-compliant promise middleware for Redux.|符合FSA的Redux的promise中间件|
|@types/redux-promise|This package contains type definitions for redux-promise|该软件包包含redux-promise的类型定义|
|immer|Create the next immutable state tree by simply modifying the current tree|通过简单地修改当前树来创建下一个不可变状态树|
|redux-immer|redux-immer is used to create an equivalent function of Redux combineReducers that works with immer state.|redux-immer用于创建`Redux combineReducers`的等效功能，该功能可与`immer`状态一起使用|
|connected-react-router|A Redux binding for React Router v4 and v5|用于React Router v4和v5的Redux绑定|


### 2.3 支持typescript
- 需要生成一个`tsconfig.json`文件来告诉`ts-loader`如何编译代码TypeScript代码
- 我们可以先全局安装一下`typescript`,然后通过`tsc`命令生成一个`tsconfig.json`配置文件

```js
cnpm i typescript -g
tsc --init
```

`tsconfig.json`配置文件的内容如下
```js
{
  "compilerOptions": {
    "outDir": "./dist",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "ESNext",
    "target": "es5",
    "jsx": "react",
    "esModuleInterop":true
  },
  "include": [
    "./src/**/*"
  ]
}
```


|项目|含义|
|:----|:----|
|outDir|指定输出目录|
|sourceMap|把ts 文件编译成 js 文件的时候，同时生成对应的sourceMap文件|
|noImplicitAny|如果为true的话，TypeScript 编译器无法推断出类型时，它仍然会生成 JavaScript 文件，但是它也会报告一个错误|
|module：代码规范|target：转换成es5|
|jsx|react模式会生成React.createElement，在使用前不需要再进行转换操作了，输出文件的扩展名为.js|
|include|需要编译的目录|
|allowSyntheticDefaultImports|允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。|
|esModuleInterop|设置 esModuleInterop: true 使 typescript 来兼容所有模块方案的导入|

### 2.4 编写webpack配置文件
- webpack.config.js

```js
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')
const path = require('path');
module.exports = {
    mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',//默认是开发模块
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,//热更新插件
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: {//browserHistory的时候，刷新会报404. 自动重定向到index.html
            index: './index.html'
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "~": path.resolve(__dirname, 'node_modules')
        },
        //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            "libraryName": 'antd',
                            "libraryDirectory": "es",
                            "style": "css"
                        })]
                    }),
                    compilerOptions: {
                        module: 'es2015'
                    }
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { importLoaders: 0 }
                }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                    }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: { importLoaders: 0 }
                },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //热更新插件
        new webpack.HotModuleReplacementPlugin()
    ]
}
```

### 2.5 在package.json中添加命令
- package.json

```diff
 "scripts": {
+    "build": "webpack",
+    "dev": "webpack-dev-server"
  }
```

### 2.6 src\index.tsx
src\index.tsx

```js
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render((
    <h1>hello</h1>
),document.getElementById('root'));
```

### 2.7 src\index.html
src\index.html

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css">
    <title>React Project</title>
</head>

<body>
    <script>
        let docEle = document.documentElement;
        function setRemUnit() {
            docEle.style.fontSize = docEle.clientWidth / 10 + 'px';
        }
        setRemUnit();
        window.addEventListener('resize', setRemUnit);
    </script>
    <div id="root"></div>
</body>

</html>
```

