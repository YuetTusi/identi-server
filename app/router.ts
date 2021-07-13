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
  router.get('/resource/level', controller.permission.resource.getResourceWithLevel); //* 查询所有资源，按层级返回
  router.get('/resource/role/:id', controller.permission.resource.getResourceByRoleId);//* 按用户id查询拥有的资源

  //# 角色管理
  router.get('/role/:id', controller.permission.role.getById); //* id查询角色
  router.post('/role', controller.permission.role.findByPage); //* 查询角色
  router.put('/role/resource/:id', controller.permission.role.updateResourceById); //* 更新角色所属资源

  //# 用户管理
  router.get('/user/:id', controller.permission.user.getById); //* id查询用户
  router.post('/user', controller.permission.user.findByPage); //* 查询用户
};
