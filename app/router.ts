import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  //# 用户登录
  router.get('/login/:id', controller.auth.login.getById); //* 按ID查询登录用户及角色
  router.post('/login', controller.auth.login.valid); //* 验证用户&密码

  //# 菜单
  router.get('/menu/:id', controller.menu.menu.getMenuByUserId); //* 查询登录用户的菜单

  //# 我的案件
  router.post('/default/list', controller.default.default.findByPage);//* 查询我的案件列表
  router.get('/default/:id', controller.default.default.findById); //* 按id查询案件

  //# 资源查看
  router.get('/resource', controller.permission.resource.getAll); //* 查询所有资源
  router.get('/resource/level', controller.permission.resource.getResourceWithLevel); //* 查询所有资源，按层级返回
  router.get('/resource/role/:id', controller.permission.resource.getResourceByRoleId);//* 按用户id查询拥有的资源
  router.post('/resource/list', controller.permission.resource.findByPage); //* 资源查看

  //# 角色管理
  router.get('/role', controller.permission.role.getAll); //* 查询全部角色
  router.get('/role/:id', controller.permission.role.getById); //* id查询角色
  router.post('/role/list', controller.permission.role.findByPage); //* 查询角色
  router.put('/role/resource/:id', controller.permission.role.updateResourceById); //* 更新角色所属资源

  //# 用户管理
  router.get('/user/', controller.permission.user.getAll); //* 查询全部用户
  router.get('/user/:id', controller.permission.user.getById); //* id查询用户
  router.get('/user/role/:id', controller.permission.user.getRoleById); //* id查询用户拥有角色
  router.get('/user/count/:username', controller.permission.user.countByUserName); //* 查询用户名存在数量
  router.post('/user/list', controller.permission.user.findByPage); //* 查询用户
  router.post('/user', controller.permission.user.insert); //* 添加用户
  router.put('/user/:id', controller.permission.user.update); //* 更新用户
  router.put('/user/role/:id', controller.permission.user.updateRoleById); //* 更新用户拥有的角色
  router.put('/user/reset/:id', controller.permission.user.modifyPassword); //* 重置用户密码
  router.delete('/user/:id', controller.permission.user.del); //* 删除用户

  //# 案件管理
  router.get('/law-case/:id', controller.permission.lawCase.findById); //* 按id查询案件
  router.get('/law-case/count/:case_name', controller.permission.lawCase.countByCaseName); //* 查询案件存在数量
  router.post('/law-case/list', controller.permission.lawCase.findByPage); //* 查询案件
  router.post('/law-case', controller.permission.lawCase.insert); //* 添加案件
  router.put('/law-case/:id', controller.permission.lawCase.update); //* 更新案件
  router.put('/law-case/state/:id', controller.permission.lawCase.updateState); //* 更新案件状态
  router.delete('/law-case/:id', controller.permission.lawCase.del); //* 删除案件

  //# 案件记录
  router.get('/rec/law-case/:id', controller.rec.rec.getLastByCaseId); //* 查询案件最近一条记录
  router.post('/rec', controller.rec.rec.insert); //* 添加案件记录
  router.post('/rec/append', controller.rec.rec.appendAndChangeState); //* 添加案件记录并更新案件状态

  //# 字典
  router.get('/dict/:category', controller.dict.dict.getByCategory); //* 按分类查询字典
};
