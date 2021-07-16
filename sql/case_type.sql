CREATE TABLE `identi_server`.`case_type` (
  `name` VARCHAR(255) NULL COMMENT '名称',
  `value` VARCHAR(255) NULL COMMENT '值')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '案件类型字典';

truncate table `case_type`;

insert into `case_type` (`name`,`value`)
values 
('黑客','0100'),
('淫秽色情','0200'),
('赌博','0300'),
('网络盗窃','0400'),
('侵犯知识产权','0500'),
('诈骗','0600'),
('传销','0700'),
('销售禁售物品','0800'),
('敲诈勒索','0900'),
('泄密','1000'),
('危害国家安全','1100'),
('恐怖','1200'),
('邪教','1300'),
('抢劫抢夺','1400'),
('传统盗窃','1500'),
('杀人','1600'),
('制毒贩毒','1700'),
('侮辱诽谤','1800'),
('其他','9900');