CREATE TABLE `case_rec` (
  `id` varchar(45) NOT NULL,
  `case_id` varchar(45) DEFAULT NULL COMMENT '案件id',
  `rec_time` datetime DEFAULT NULL COMMENT '鉴定时间',
  `rec_place` varchar(255) DEFAULT NULL COMMENT '鉴定地点',
  `suggest` varchar(512) DEFAULT NULL COMMENT '鉴定意见',
  `action_note` varchar(512) DEFAULT NULL COMMENT '动作原因',
  `action_time` datetime DEFAULT NULL COMMENT '动作时间',
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
  `col10` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_case_id_idx` (`case_id`),
  CONSTRAINT `FK_case_id` FOREIGN KEY (`case_id`) REFERENCES `law_case` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='案件鉴定记录表';