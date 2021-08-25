import { EggPlugin } from 'egg';

const plugin: EggPlugin = {

  //MySQL
  mysql: {
    enable: true,
    package: 'egg-mysql'
  },
  //跨域
  cors: {
    enable: true,
    package: 'egg-cors'
  },
  //下载器
  downloader: {
    enable: true,
    package: 'egg-downloader'
  }
};

export default plugin;
