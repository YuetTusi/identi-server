import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  //# 应用Key
  config.keys = 'az_identi';

  //# 中间件配置
  config.middleware = [
    // 'auth'
  ];

  //# login中间件参数
  config.auth = {
    enable: true,
    ignore: /.*\/(login|attachment\/download)/,
    JWT_KEY: config.keys,
  }

  //# 插件配置
  //配置MySQL
  config.mysql = {
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '8712y0u0e',
      // 数据库名
      database: 'identi_server',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.multipart = {
    fileSize: '524288mb',
    // fileSize: '1mb',
    fileExtensions: [
      '.txt',
      '.mkv',
    ]
  };

  // 业务配置
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  return {
    ...config,
    ...bizConfig,
  };
};
