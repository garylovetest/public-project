# 一.项目的初始化

## 1 npm初始化

```js
npm init -y
```

生成`package.json`文件：

- 记录项目的依赖

## 2 git的初始化

```
git init
```

生成git隐藏文件夹，git的本地仓库

## 3 创建ReadMe文件

# 二、搭建项目

## 1 安装Koa框架

```js
npm i koa
```

## 2 编写最基本的app

创建src/main.js

```js
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello world'
})

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})
```

## 3 测试

终端使用node src/main.js启动服务，用浏览器或postman访问

![image-20220314113210788](image-20220314113210788.png)









