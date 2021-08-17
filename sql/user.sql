CREATE TABLE `user` (
  `id` varchar(45) NOT NULL COMMENT '主键',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `mail` varchar(255) DEFAULT NULL COMMENT '电子邮件',
  `mobile` varchar(255) DEFAULT NULL COMMENT '手机号',
  `realname` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `col1` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col2` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col3` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col4` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col5` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col6` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col7` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col8` varchar(45) DEFAULT NULL COMMENT '备用字段',
  `col9` varchar(45) DEFAULT NULL COMMENT '备用字段',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

INSERT INTO `identi_server`.`user`
(`id`,`username`,`password`,`mail`,`realname`,`desc`,`create_time`,`update_time`)
VALUES
('a7b5ee69-d8ae-11eb-a03f-79a5cf1d245f','admin','YWRtaW4=','admin@azwx.com','默认管理员','管理员','2021-08-16 00:00:00','2021-08-16 00:00:00');