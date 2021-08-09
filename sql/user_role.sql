CREATE TABLE `user_role` (
  `user_id` varchar(45) DEFAULT NULL COMMENT '用户id外键',
  `role_id` varchar(45) DEFAULT NULL COMMENT '角色id外键',
  KEY `FK_user_id_idx` (`user_id`),
  KEY `FK_role_id_idx` (`role_id`),
  CONSTRAINT `FK_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户-角色关系表';
