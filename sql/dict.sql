CREATE TABLE `identi_server`.`dict` (
  `id` VARCHAR(45) NOT NULL,
  `name` VARCHAR(255) NULL COMMENT '字典项',
  `value` VARCHAR(255) NULL COMMENT '字典值\n',
  `seq` INT NULL COMMENT '排序权重',
  `category` VARCHAR(45) NULL COMMENT '分类',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '字典表';


truncate table `dict`;

insert into `dict` (`id`,`name`,`value`,`seq`,`category`)
values 
(uuid(),'黑客','0100',0,'case-type'),
(uuid(),'淫秽色情','0200',0,'case-type'),
(uuid(),'赌博','0300',0,'case-type'),
(uuid(),'网络盗窃','0400',0,'case-type'),
(uuid(),'侵犯知识产权','0500',0,'case-type'),
(uuid(),'诈骗','0600',0,'case-type'),
(uuid(),'传销','0700',0,'case-type'),
(uuid(),'销售禁售物品','0800',0,'case-type0'),
(uuid(),'敲诈勒索','0900',0,'case-type'),
(uuid(),'泄密','1000',0,'case-type'),
(uuid(),'危害国家安全','1100',0,'case-type'),
(uuid(),'恐怖','1200',0,'case-type'),
(uuid(),'邪教','1300',0,'case-type'),
(uuid(),'抢劫抢夺','1400',0,'case-type'),
(uuid(),'传统盗窃','1500',0,'case-type'),
(uuid(),'杀人','1600',0,'case-type'),
(uuid(),'制毒贩毒','1700',0,'case-type'),
(uuid(),'侮辱诽谤','1800',0,'case-type'),
(uuid(),'其他','9900',0,'case-type');