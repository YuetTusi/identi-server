import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  //# 用户登录
  router.get('/login/:id', controller.auth.login.getById); //* 按ID查询登录用户及角色
  router.post('/login', controller.auth.login.valid); //* 验证用户&密码


};
