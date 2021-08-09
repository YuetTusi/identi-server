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
      'http://192.168.1.11:9010'
    ],
  }

  // the return config will combines to EggAppConfig
  return config;
};
