CREATE TABLE `role` (
  `id` varchar(45) NOT NULL COMMENT '主键',
  `name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

INSERT INTO `identi_server`.`role`
(`id`,`name`,`desc`,`create_time`,`update_time`)
VALUES
('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','admin','管理员','2021-08-16 00:00:00','2021-08-16 00:00:00');
