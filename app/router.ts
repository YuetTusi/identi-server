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
  router.get('/resource/has-parent', controller.permission.resource.getResourceHasParent); //* 查询有上级资源的数据
  router.get('/resource/role/:id', controller.permission.resource.getResourceByRoleId);//* 按用户id查询拥有的资源
  router.post('/resource/list', controller.permission.resource.findByPage); //* 资源查看
  router.put('/resource/:id/seq', controller.permission.resource.updateSeq); //* 更新菜单顺序

  //# 角色管理
  router.get('/role', controller.permission.role.getAll); //* 查询全部角色
  router.get('/role/:id', controller.permission.role.getById); //* id查询角色
  router.get('/role/count/:name', controller.permission.role.findNameCount); //* 查询角色名称数量
  router.post('/role/list', controller.permission.role.findByPage); //* 查询角色
  router.post('/role', controller.permission.role.create); //* 添加角色
  router.put('/role/resource/:id', controller.permission.role.updateResourceById); //* 更新角色所属资源
  router.delete('/role/:id', controller.permission.role.del); //* 删除角色

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
  router.post('/rec/append', controller.rec.rec.appendAndChangeCase); //* 添加案件记录并更新案件

  //# 设备
  router.get('/device/:id', controller.device.device.findById); //* 分页查询
  router.get('/device/law-case/:id', controller.device.device.findByCase);//* 查询案件下设备
  router.post('/device/list', controller.device.device.findByPage); //* 分页查询
  router.post('/device', controller.device.device.insert); //* 添加设备
  router.put('/device/:id', controller.device.device.update); //* 更新设备
  router.delete('/device/:id', controller.device.device.del); //* 删除设备

  //# 操作消息
  router.get('/message/:id', controller.message.message.getById); //* 按id查询消息
  router.get('/message/user/:id', controller.message.message.getByUser); //* 查询用户消息
  router.post('/message/list', controller.message.message.findByPage); //* 分页查询
  router.post('/message', controller.message.message.insert); //* 创建消息
  router.put('/message/:id', controller.message.message.update); //* 更新消息
  router.put('/message/:id/read', controller.message.message.updateRead); //* 更新已读消息
  router.put('/message/user/:id', controller.message.message.updateReadAll); //* 更新全部已读消息

  //# 附件记录
  router.get('/case-attach/case/:id', controller.caseAttach.caseAttach.findByCaseId); //* 查询案件全部附件
  router.get('/case-attach/device/:id', controller.caseAttach.caseAttach.findBySuspectId); //* 查询设备全部附件
  router.post('/case-attach/list', controller.caseAttach.caseAttach.findByPage); //* 分页查询
  router.post('/case-attach', controller.caseAttach.caseAttach.insert); //* 添加附件记录
  router.post('/case-attach/multi', controller.caseAttach.caseAttach.multiInsert); //* 批量添加附件记录
  router.delete('/case-attach', controller.caseAttach.caseAttach.del); //* 删除附件记录

  //# 附件
  router.get('/attachment/download', controller.attachment.download.doDownload); //* 下载附件
  router.post('/attachment/upload', controller.attachment.upload.doUpload); //* 上传附件

  //# 字典
  router.get('/dict/:id', controller.dict.dict.findById); //* 按分类查询字典
  router.get('/dict/category/:category', controller.dict.dict.getByCategory); //* 按分类查询字典
  router.post('/dict/list', controller.dict.dict.findByPage); //* 分页查询
  router.post('/dict', controller.dict.dict.insert); //* 添加字典
  router.put('/dict', controller.dict.dict.update); //* 更新查询
  router.delete('/dict/:id', controller.dict.dict.del); //* 删除字典
};
