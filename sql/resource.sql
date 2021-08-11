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

