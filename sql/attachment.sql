CREATE TABLE `attachment` (
  `id` varchar(45) NOT NULL COMMENT 'PK',
  `case_id` varchar(45) DEFAULT NULL COMMENT '案件id',
  `file_name` varchar(255) DEFAULT NULL COMMENT '原文件名称',
  `hash_name` varchar(255) DEFAULT NULL COMMENT '上传后文件名',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='附件表';
