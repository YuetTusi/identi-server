CREATE TABLE `resource` (
  `id` varchar(45) NOT NULL COMMENT '主键',
  `pid` varchar(45) DEFAULT NULL COMMENT '父级id',
  `name` varchar(255) DEFAULT NULL COMMENT '权限/资源名称',
  `key` varchar(255) DEFAULT NULL COMMENT '路径/键值',
  `type` varchar(255) DEFAULT NULL COMMENT '类型',
  `level` int(11) DEFAULT NULL,
  `seq` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `col1` varchar(45) DEFAULT NULL,
  `col2` varchar(45) DEFAULT NULL,
  `col3` varchar(45) DEFAULT NULL,
  `col4` varchar(45) DEFAULT NULL,
  `col5` varchar(45) DEFAULT NULL,
  `col6` varchar(45) DEFAULT NULL,
  `col7` varchar(45) DEFAULT NULL,
  `col8` varchar(45) DEFAULT NULL,
  `col9` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='资源/权限表';

TRUNCATE TABLE `resource`;

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('8479bfd5-dee7-11eb-a5a5-6f43023f3655','0','案件鉴定','/','menu',0,10,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('cf89118a-d8b0-11eb-a03f-79a5cf1d245f','0','系统设置','/permission','menu',0,20,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('c79f6bd6-eb78-11eb-9fcf-42c7204a1485','0','个人中心','/profile','menu',0,100,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('108b386b-e3c0-11eb-bf98-e1e6db976120','f96244f1-d8b0-11eb-a03f-79a5cf1d245f','添加用户','/permission/user/add','sub',2,10,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('23f624a0-e60a-11eb-b7e3-d6b0ef9e4994','e8ec0d9a-dfcc-11eb-a5a5-6f43023f3655','添加案件','/permission/law-case/add','sub',2,10,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('23f6cb8e-e60a-11eb-b7e3-d6b0ef9e4994','e8ec0d9a-dfcc-11eb-a5a5-6f43023f3655','编辑案件','/permission/law-case/edit/:id','sub',2,20,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('3c51c048-e096-11eb-8e00-488ce5d78823','8479bfd5-dee7-11eb-a5a5-6f43023f3655','我的案件','/default','menu',1,0,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO resource (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('2dd6a586-fe4b-4d3a-8a81-f5ef39a4131d','3c51c048-e096-11eb-8e00-488ce5d78823','添加设备','/default/:id/device/add','sub',2,40,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO resource (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('a5a970f1-71e3-49e4-a140-1379cd5147ef','3c51c048-e096-11eb-8e00-488ce5d78823','编辑设备','/default/:id/device/edit/:did','sub',2,50,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('f675585a-96a9-4416-88c7-a32792b9c92c','8479bfd5-dee7-11eb-a5a5-6f43023f3655','我的消息','/message','menu',1,10,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('6742e739-f8d9-11eb-9f98-aa6910132fb3','f9641251-d8b0-11eb-a03f-79a5cf1d245f','添加角色','/permission/role/add','sub',2,10,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('c116aa0b-e920-11eb-bdb6-963853faeba9','3c51c048-e096-11eb-8e00-488ce5d78823','处理鉴定','/default/begin/:id','sub',2,30,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('d53b227a-e5d0-11eb-b7e3-d6b0ef9e4994','f96244f1-d8b0-11eb-a03f-79a5cf1d245f','编辑用户','/permission/user/edit/:id','sub',2,20,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('d6226e40-e9bd-11eb-bec6-ac91cf5b5bb5','e8ec0d9a-dfcc-11eb-a5a5-6f43023f3655','处理审核','/permission/law-case/approval/:id','sub',2,40,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('dee3ef90-e8f8-11eb-bdb6-963853faeba9','3c51c048-e096-11eb-8e00-488ce5d78823','案件详情','/default/detail/:id','sub',2,20,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('e8ec0d9a-dfcc-11eb-a5a5-6f43023f3655','cf89118a-d8b0-11eb-a03f-79a5cf1d245f','案件管理','/permission/law-case','menu',1,10,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('eaf782c1-e865-11eb-b7e3-d6b0ef9e4994','e8ec0d9a-dfcc-11eb-a5a5-6f43023f3655','案件详情','/permission/law-case/detail/:id','sub',2,30,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('f613b427-eb78-11eb-9fcf-42c7204a1485','c79f6bd6-eb78-11eb-9fcf-42c7204a1485','用户设置','/profile/setting','menu',1,10,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('f96244f1-d8b0-11eb-a03f-79a5cf1d245f','cf89118a-d8b0-11eb-a03f-79a5cf1d245f','用户管理','/permission/user','menu',1,20,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('f9641251-d8b0-11eb-a03f-79a5cf1d245f','cf89118a-d8b0-11eb-a03f-79a5cf1d245f','角色管理','/permission/role','menu',1,30,'2021-08-16 00:00:00','2021-08-16 00:00:00');

INSERT INTO `resource` (`id`,`pid`,`name`,`key`,`type`,`level`,`seq`,`create_time`,`update_time`)
VALUES ('f964b67e-d8b0-11eb-a03f-79a5cf1d245f','cf89118a-d8b0-11eb-a03f-79a5cf1d245f','资源查看','/permission/resource','menu',1,40,'2021-08-16 00:00:00','2021-08-16 00:00:00');