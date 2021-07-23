import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = 'az_identi';

  //# 中间件配置
  config.middleware = [
    // 'auth'
  ];

  //# login中间件参数
  config.auth = {
    enable: true,
    ignore: /.*\/(login)/,
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

  //配置CORS
  config.cors = {
    // origin: '*',
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['http://localhost:8085', 'http://127.0.0.1:8085'],
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
