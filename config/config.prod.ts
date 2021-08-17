import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  //配置CORS
  config.cors = {
    // origin: '*',
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  //MySQL
  config.mysql = {
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '1qaz2wsx',
      // 数据库名
      database: 'identi_server',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  config.security = {
    csrf: { enable: false },
    domainWhiteList: [
      'http://127.0.0.1:9010',
      'http://192.168.1.12:9010',
      'http://192.168.1.10:8085'
    ],
  }

  // the return config will combines to EggAppConfig
  return config;
};
