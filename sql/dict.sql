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


TRUNCATE TABLE `dict`;

INSERT INTO `dict` (`id`,`name`,`value`,`seq`,`category`)
VALUES 
(uuid(),'黑客','0100',0,'case-type'),
(uuid(),'淫秽色情','0200',0,'case-type'),
(uuid(),'赌博','0300',0,'case-type'),
(uuid(),'网络盗窃','0400',0,'case-type'),
(uuid(),'侵犯知识产权','0500',0,'case-type'),
(uuid(),'诈骗','0600',0,'case-type'),
(uuid(),'传销','0700',0,'case-type'),
(uuid(),'销售禁售物品','0800',0,'case-type'),
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
(uuid(),'其他','9900',0,'case-type'),
(uuid(),'未知','00',0,'ethnicity'),
(uuid(),'汉族','01',0,'ethnicity'),
(uuid(),'满族','11',0,'ethnicity'),
(uuid(),'回族','03',0,'ethnicity'),
(uuid(),'蒙古族','02',0,'ethnicity'),
(uuid(),'藏族','04',0,'ethnicity'),
(uuid(),'维吾尔族','05',0,'ethnicity'),
(uuid(),'朝鲜族','10',0,'ethnicity'),
(uuid(),'苗族','06',0,'ethnicity'),
(uuid(),'彝族','07',0,'ethnicity'),
(uuid(),'壮族','08',0,'ethnicity'),
(uuid(),'布依族','09',0,'ethnicity'),
(uuid(),'侗族','12',0,'ethnicity'),
(uuid(),'瑶族','13',0,'ethnicity'),
(uuid(),'白族','14',0,'ethnicity'),
(uuid(),'土家族','15',0,'ethnicity'),
(uuid(),'哈尼族','16',0,'ethnicity'),
(uuid(),'哈萨克族','17',0,'ethnicity'),
(uuid(),'傣族','18',0,'ethnicity'),
(uuid(),'黎族','19',0,'ethnicity'),
(uuid(),'傈僳族','20',0,'ethnicity'),
(uuid(),'低族','21',0,'ethnicity'),
(uuid(),'舍族','22',0,'ethnicity'),
(uuid(),'高山族','23',0,'ethnicity'),
(uuid(),'拉枯族','24',0,'ethnicity'),
(uuid(),'水族','25',0,'ethnicity'),
(uuid(),'东乡族','26',0,'ethnicity'),
(uuid(),'纳西族','27',0,'ethnicity'),
(uuid(),'景颇族','28',0,'ethnicity'),
(uuid(),'柯尔克孜族','29',0,'ethnicity'),
(uuid(),'土族','30',0,'ethnicity'),
(uuid(),'达斡尔族','31',0,'ethnicity'),
(uuid(),'松佬族','32',0,'ethnicity'),
(uuid(),'羌族','33',0,'ethnicity'),
(uuid(),'布朗族','34',0,'ethnicity'),
(uuid(),'撤拉族','35',0,'ethnicity'),
(uuid(),'毛南族','36',0,'ethnicity'),
(uuid(),'讫佬族','37',0,'ethnicity'),
(uuid(),'锡伯族','38',0,'ethnicity'),
(uuid(),'阿昌族','39',0,'ethnicity'),
(uuid(),'普米族','40',0,'ethnicity'),
(uuid(),'塔吉克族','41',0,'ethnicity'),
(uuid(),'怒族','42',0,'ethnicity'),
(uuid(),'乌孜别克族','43',0,'ethnicity'),
(uuid(),'俄罗斯族','44',0,'ethnicity'),
(uuid(),'鄂温克族','45',0,'ethnicity'),
(uuid(),'德昂族','46',0,'ethnicity'),
(uuid(),'保安族','47',0,'ethnicity'),
(uuid(),'裕固族','48',0,'ethnicity'),
(uuid(),'京族','49',0,'ethnicity'),
(uuid(),'塔塔尔族','50',0,'ethnicity'),
(uuid(),'独龙族','51',0,'ethnicity'),
(uuid(),'鄂伦春族','52',0,'ethnicity'),
(uuid(),'赫哲族','53',0,'ethnicity'),
(uuid(),'门巴族','54',0,'ethnicity'),
(uuid(),'路巴族','55',0,'ethnicity'),
(uuid(),'基诺族','56',0,'ethnicity'),
(uuid(),'其他','99',0,'ethnicity'),
(uuid(),'未知','0',0,'certificate-type'),
(uuid(),'身份证','111',0,'certificate-type'),
(uuid(),'临时身份证','112',0,'certificate-type'),
(uuid(),'户口薄','113',0,'certificate-type'),
(uuid(),'中国人民解放军军官证','114',0,'certificate-type'),
(uuid(),'中国人民武装警察部队警官证','115',0,'certificate-type'),
(uuid(),'暂住证','116',0,'certificate-type'),
(uuid(),'出生医学证明','117',0,'certificate-type'),
(uuid(),'法官证','121',0,'certificate-type'),
(uuid(),'警官证','123',0,'certificate-type'),
(uuid(),'检察官证','125',0,'certificate-type'),
(uuid(),'律师证','127',0,'certificate-type'),
(uuid(),'记者证','129',0,'certificate-type'),
(uuid(),'工作证','131',0,'certificate-type'),
(uuid(),'学生证','133',0,'certificate-type'),
(uuid(),'出入证','151',0,'certificate-type'),
(uuid(),'临时出入证','153',0,'certificate-type'),
(uuid(),'住宿证','155',0,'certificate-type'),
(uuid(),'医疗证','157',0,'certificate-type'),
(uuid(),'劳保证','159',0,'certificate-type'),
(uuid(),'献血证','161',0,'certificate-type'),
(uuid(),'保险单含“保险证”','163',0,'certificate-type'),
(uuid(),'会员证（包括工会及各种协会会员证）','191',0,'certificate-type'),
(uuid(),'离休证','211',0,'certificate-type'),
(uuid(),'退休证','213',0,'certificate-type'),
(uuid(),'老年证','215',0,'certificate-type'),
(uuid(),'残疾证','217',0,'certificate-type'),
(uuid(),'结婚证','219',0,'certificate-type'),
(uuid(),'离婚证','221',0,'certificate-type'),
(uuid(),'独生子女证','223',0,'certificate-type'),
(uuid(),'毕业证书','225',0,'certificate-type'),
(uuid(),'肄业证','227',0,'certificate-type'),
(uuid(),'结业证','229',0,'certificate-type'),
(uuid(),'学位证','231',0,'certificate-type'),
(uuid(),'军人通行证','233',0,'certificate-type'),
(uuid(),'证明信函介绍信','291',0,'certificate-type'),
(uuid(),'持枪证','311',0,'certificate-type'),
(uuid(),'枪证','313',0,'certificate-type'),
(uuid(),'枪支(弹药)挽运许可证','315',0,'certificate-type'),
(uuid(),'砍伐证','317',0,'certificate-type'),
(uuid(),'准运证（各种物资的运轴许可）','319',0,'certificate-type'),
(uuid(),'准购证','321',0,'certificate-type'),
(uuid(),'粮油证','323',0,'certificate-type'),
(uuid(),'购煤证','325',0,'certificate-type'),
(uuid(),'购煤气证','327',0,'certificate-type'),
(uuid(),'房屋产权证','329',0,'certificate-type'),
(uuid(),'土地使用证','329',0,'certificate-type'),
(uuid(),'车辆通行证','333',0,'certificate-type'),
(uuid(),'机动车驾驶证','335',0,'certificate-type'),
(uuid(),'机动车行驶证','337',0,'certificate-type'),
(uuid(),'机动车登记证书','339',0,'certificate-type'),
(uuid(),'机动车年检合格证','341',0,'certificate-type'),
(uuid(),'春运临时检验合格证','343',0,'certificate-type'),
(uuid(),'飞机驾驶证','345',0,'certificate-type'),
(uuid(),'船舶驾驶证','347',0,'certificate-type'),
(uuid(),'船舶行驶证','349',0,'certificate-type'),
(uuid(),'自行车行驶证','351',0,'certificate-type'),
(uuid(),'汽车号牌','353',0,'certificate-type'),
(uuid(),'拖拉机牌','355',0,'certificate-type'),
(uuid(),'摩托车牌','357',0,'certificate-type'),
(uuid(),'船舶牌','359',0,'certificate-type'),
(uuid(),'三轮车牌','361',0,'certificate-type'),
(uuid(),'自行车牌','363',0,'certificate-type'),
(uuid(),'残疾人机动轮椅车','391',0,'certificate-type'),
(uuid(),'外交护照','411',0,'certificate-type'),
(uuid(),'公务护照','412',0,'certificate-type'),
(uuid(),'因公普通护照','413',0,'certificate-type'),
(uuid(),'普通护照','414',0,'certificate-type'),
(uuid(),'旅行证','415',0,'certificate-type'),
(uuid(),'人出境通行证','416',0,'certificate-type'),
(uuid(),'外国人出人境证','417',0,'certificate-type'),
(uuid(),'外国人旅行证','418',0,'certificate-type'),
(uuid(),'海员证','419',0,'certificate-type'),
(uuid(),'香港特别行政区护照','420',0,'certificate-type'),
(uuid(),'澳门特别行政区护照','421',0,'certificate-type'),
(uuid(),'澳门特别行政区旅行证','423',0,'certificate-type'),
(uuid(),'台湾居民来往大陆通行证','511',0,'certificate-type'),
(uuid(),'台湾居民来往大陆通行证（一次有效）','512',0,'certificate-type'),
(uuid(),'往来港澳通行证','513',0,'certificate-type'),
(uuid(),'前往港澳通行证','515',0,'certificate-type'),
(uuid(),'港澳同胞回乡证(通行卡)','516',0,'certificate-type'),
(uuid(),'大陆居民往来台湾通行证','517',0,'certificate-type'),
(uuid(),'因公往来香港澳门特别行政区通行证','518',0,'certificate-type'),
(uuid(),'华侨回国定居证','551',0,'certificate-type'),
(uuid(),'台湾居民定居证','552',0,'certificate-type'),
(uuid(),'外国人永久居留证','553',0,'certificate-type'),
(uuid(),'外国人居留证','554',0,'certificate-type'),
(uuid(),'外国人临时居留证','555',0,'certificate-type'),
(uuid(),'入籍证书','556',0,'certificate-type'),
(uuid(),'出籍证书','557',0,'certificate-type'),
(uuid(),'复籍证书','558',0,'certificate-type'),
(uuid(),'外籍船员住宿证','611',0,'certificate-type'),
(uuid(),'随船工作证','612',0,'certificate-type'),
(uuid(),'海上值勤证(红色)','620',0,'certificate-type'),
(uuid(),'海上值勤证(蓝色)','621',0,'certificate-type'),
(uuid(),'出海船民证','631',0,'certificate-type'),
(uuid(),'出海船舶户口薄','633',0,'certificate-type'),
(uuid(),'出海船舶边防登记簿','634',0,'certificate-type'),
(uuid(),'搭靠台轮许可证','635',0,'certificate-type'),
(uuid(),'台湾居民登陆证','636',0,'certificate-type'),
(uuid(),'台湾船员登陆证','637',0,'certificate-type'),
(uuid(),'外国船员登陆证','638',0,'certificate-type'),
(uuid(),'对台劳务人员登轮作业证','639',0,'certificate-type'),
(uuid(),'合资船船员登陆证','640',0,'certificate-type'),
(uuid(),'合资船船员登轮作业证','641',0,'certificate-type'),
(uuid(),'粤港澳流动渔民证','642',0,'certificate-type'),
(uuid(),'粤港澳临时流动渔民证','643',0,'certificate-type'),
(uuid(),'粤港澳流动渔船户口簿','644',0,'certificate-type'),
(uuid(),'航行港澳船舶证明书','645',0,'certificate-type'),
(uuid(),'往来港澳小型船舶查验薄','646',0,'certificate-type'),
(uuid(),'劳务人员登轮作业证','650',0,'certificate-type'),
(uuid(),'边境管理区通行证','711',0,'certificate-type'),
(uuid(),'中朝鸭绿江、图们江水文作业证','721',0,'certificate-type'),
(uuid(),'朝中鸭绿江、图们江水文作业证','722',0,'certificate-type'),
(uuid(),'中朝流筏固定代表证','723',0,'certificate-type'),
(uuid(),'朝中流筏固定代表证','724',0,'certificate-type'),
(uuid(),'中朝鸭绿江、图们江船员证','725',0,'certificate-type'),
(uuid(),'朝中鸭绿江、图们江船员证','726',0,'certificate-type'),
(uuid(),'中朝边境地区公安总代表证','727',0,'certificate-type'),
(uuid(),'朝中边境地区公安总代表证','728',0,'certificate-type'),
(uuid(),'中朝边境地区公安副总代表证','729',0,'certificate-type'),
(uuid(),'朝中边境地区公安副总代表证','730',0,'certificate-type'),
(uuid(),'中朝边境地区公安代表证','731',0,'certificate-type'),
(uuid(),'朝中边境地区公安代表证','732',0,'certificate-type'),
(uuid(),'中朝边境地区出人境通行证(甲、乙种本)','733',0,'certificate-type'),
(uuid(),'朝中边境公务通行证','734',0,'certificate-type'),
(uuid(),'朝中边境住民国境通行证','735',0,'certificate-type'),
(uuid(),'中蒙边境地区出人境通行证(甲、乙种本)','736',0,'certificate-type'),
(uuid(),'蒙中边境地区出入境通行证','737',0,'certificate-type'),
(uuid(),'中缅边境地区出人境通行证','738',0,'certificate-type'),
(uuid(),'缅甸中国边境通行证','739',0,'certificate-type'),
(uuid(),'云南省边境地区境外边民人出境证','740',0,'certificate-type'),
(uuid(),'中尼边境地区出人境通行证','741',0,'certificate-type'),
(uuid(),'尼中边境地区出人境通行证','742',0,'certificate-type'),
(uuid(),'中越边境地区出入境通行证','743',0,'certificate-type'),
(uuid(),'越中边境地区出人境通行证','744',0,'certificate-type'),
(uuid(),'中老边境地区出人境通行证','745',0,'certificate-type'),
(uuid(),'老中边境','746',0,'certificate-type'),
(uuid(),'其他','990',0,'certificate-type');

