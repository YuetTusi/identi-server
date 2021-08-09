import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  //# 配置CORS
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  config.security = {
    csrf: { enable: false },
    domainWhiteList: [
      // 'http://localhost:8085',
      // 'http://127.0.0.1:8085',
      // 'http://192.168.1.12:8085',
      // 'http://192.168.1.25:8085'
    ] //跨域白名单
  }

  return config;
};
