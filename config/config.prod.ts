import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  //配置CORS
  config.cors = {
    // origin: '*',
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  config.security = {
    csrf: { enable: false },
    domainWhiteList: [
      'http://127.0.0.1:9010',
      'http://192.168.1.12:9010'
    ],
  }

  // the return config will combines to EggAppConfig
  return config;
};
