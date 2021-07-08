import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  //# 用户登录
  router.get('/login/:id', controller.auth.login.getById); //* 按ID查询登录用户及角色
  router.post('/login', controller.auth.login.valid); //* 验证用户&密码

  //# 菜单
  router.get('/menu/:id', controller.menu.menu.getMenuByUserId); //* 查询登录用户的菜单

  //# 资源查看
  router.get('/resource', controller.permission.resource.getAll); //* 查询所有资源
  router.post('/resource', controller.permission.resource.findByPage); //* 资源查看

  //# 角色管理
  router.get('/role/:id', controller.permission.role.getById); //* id查询角色
  router.post('/role', controller.permission.role.findByPage); //* 查询角色
};
