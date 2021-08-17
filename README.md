# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+

### 部署

1. 删除node_modules目录
2. 安装生产依赖`npm install --production`
3. 编译*.ts文件`tsc -p tsconfig.json`

拷贝到部署服务器，运行`npm run start`启动服务；`npm run stop`停止服务。

若在编译ts文件报找不到tslib，修改tsconfig.json的`importHelper`配置为`false`。

服务器须安装node.js和egg.js。

部署容器使用nginx。
