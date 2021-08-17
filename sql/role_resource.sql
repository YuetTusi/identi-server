CREATE TABLE `role_resource` (
  `role_id` varchar(45) DEFAULT NULL,
  `resource_id` varchar(45) DEFAULT NULL,
  KEY `FK_role_id_idx` (`role_id`),
  KEY `FK_resource_id_idx` (`resource_id`),
  CONSTRAINT `FK_resource_id` FOREIGN KEY (`resource_id`) REFERENCES `resource` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_to_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色-资源关系表';

INSERT INTO 
	`identi_server`.`role_resource`(`role_id`,`resource_id`)
VALUES 
	('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','8479bfd5-dee7-11eb-a5a5-6f43023f3655'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','3c51c048-e096-11eb-8e00-488ce5d78823'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','dee3ef90-e8f8-11eb-bdb6-963853faeba9'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','c116aa0b-e920-11eb-bdb6-963853faeba9'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','cf89118a-d8b0-11eb-a03f-79a5cf1d245f'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','e8ec0d9a-dfcc-11eb-a5a5-6f43023f3655'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','23f624a0-e60a-11eb-b7e3-d6b0ef9e4994'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','23f6cb8e-e60a-11eb-b7e3-d6b0ef9e4994'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','eaf782c1-e865-11eb-b7e3-d6b0ef9e4994'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','d6226e40-e9bd-11eb-bec6-ac91cf5b5bb5'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','f96244f1-d8b0-11eb-a03f-79a5cf1d245f'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','108b386b-e3c0-11eb-bf98-e1e6db976120'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','d53b227a-e5d0-11eb-b7e3-d6b0ef9e4994'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','f9641251-d8b0-11eb-a03f-79a5cf1d245f'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','6742e739-f8d9-11eb-9f98-aa6910132fb3'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','f964b67e-d8b0-11eb-a03f-79a5cf1d245f'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','c79f6bd6-eb78-11eb-9fcf-42c7204a1485'),
  ('141cb5dd-d8af-11eb-a03f-79a5cf1d245f','f613b427-eb78-11eb-9fcf-42c7204a1485');