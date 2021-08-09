CREATE TABLE `role_resource` (
  `role_id` varchar(45) DEFAULT NULL,
  `resource_id` varchar(45) DEFAULT NULL,
  KEY `FK_role_id_idx` (`role_id`),
  KEY `FK_resource_id_idx` (`resource_id`),
  CONSTRAINT `FK_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `resource` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_to_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色-资源关系表';
