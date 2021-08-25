CREATE TABLE `message` (
  `id` varchar(45) NOT NULL COMMENT 'PK',
  `user_id` varchar(45) DEFAULT NULL COMMENT '用户id',
  `case_id` varchar(45) DEFAULT NULL COMMENT '案件id',
  `content` varchar(255) DEFAULT NULL COMMENT '消息内容',
  `read` int(11) DEFAULT NULL COMMENT '已读标识',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息表';