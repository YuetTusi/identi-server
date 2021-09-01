import dayjs from 'dayjs';
import { Service } from "egg";

/**
 * 设备Service
 */
export default class CaseAttachService extends Service {

    private tableName = 'suspect';

    constructor(props: any) {
        super(props);
    }

    /**
     * 按id查询
     * @param id 主键
     */
    async findById(id: string) {
        const { mysql } = this.app;
        const data = await mysql.get(this.tableName, { id }, {
            columns: ['id', 'law_case_id', 'create_time', 'update_time', 'case_id', 'case_name', 'case_type_code', 'case_type',
                'ab', 'ab_name', 'object_id', 'owner_name', 'bm', 'identity_id_type_code', 'identity_id_type', 'identity_id', 'hjdz',
                'dz', 'gzdw', 'guojia_code', 'guojia', 'minzu_code', 'minzu', 'phone', 'desc', 'date', 'flag', 'officer_id', 'officer_name',
                'dept', 'dept_name', 'strflag', 'str_phone_path', 'phone_name', 'note']
        });
        return data;

    }

    /**
     * 分页查询
     * @param condition 条件
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    async findByPage(condition: any, pageIndex: number, pageSize: number) {

        const { app } = this;

        let sqlParams: any[] = [];
        let sqlCondition = '';

        if (condition.law_case_id) {
            sqlCondition += ' AND law_case_id=? ';
            sqlParams = sqlParams.concat([condition.law_case_id]);
        }

        const FIND_PAGE = `SELECT 
            id,law_case_id,create_time,update_time,case_id,case_name,case_type_code,case_type,
            ab,ab_name,object_id,owner_name,bm,identity_id_type_code,identity_id_type,identity_id,hjdz,
            dz,gzdw,guojia_code,guojia,minzu_code,minzu,phone,\`desc\`,\`date\`,flag,officer_id,officer_name,
            dept,dept_name,strflag,str_phone_path,phone_name,note
        FROM suspect
        WHERE 1=1 ${sqlCondition}
        ORDER BY create_time DESC,update_time DESC 
        LIMIT ? OFFSET ?`;
        const FIND_TOTAL_ROW = `SELECT count(*) as 'total' FROM suspect WHERE 1=1 ${sqlCondition}`;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [...sqlParams, pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW, sqlParams)
        ]);
    }

    /**
     * 添加设备
     * @param data 设备数据
     * @param attachment 附件数据
     */
    async insert(data: any, attachment: any[] = []) {
        const { mysql } = this.app;

        if (attachment.length === 0) {
            const { affectedRows } = await mysql.insert(this.tableName, data);
            return { success: affectedRows > 0 };
        } else {
            const BATCH_INSERT = 'INSERT INTO attachment (id,case_id,suspect_id,file_name,hash_name,create_time,update_time) VALUES ';
            let stat: string[] = [];
            let param: any[] = [];
            attachment.forEach(item => {
                stat.push('(?,?,?,?,?,?,?)');
                param.push(
                    item.id,
                    item.case_id,
                    item.suspect_id,
                    item.file_name,
                    item.hash_name,
                    item.create_time,
                    item.update_time
                );
            });

            return await mysql.beginTransactionScope(async (conn) => {
                await conn.query(BATCH_INSERT + stat.join(','), param);
                await conn.insert(this.tableName, data); //添加设备
                return { success: true };
            });
        }
    }

    /**
     * 更新设备
     */
    async update(data: any) {
        const { app } = this;
        data.update_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const { affectedRows } = await app.mysql.update(this.tableName, data);
        return affectedRows;
    }

    /**
     * 删除设备
     * @param id 主键
     */
    async del(id: string) {

        const { mysql } = this.app;
        const DEL_DEVICE_ATTACH = 'DELETE FROM attachment WHERE suspect_id=?';
        const DEL_DEVICE = 'DELETE FROM suspect WHERE id=?';

        return await mysql.beginTransactionScope(async (conn) => {
            await conn.query(DEL_DEVICE_ATTACH, [id]);//删除设备附件
            await conn.query(DEL_DEVICE, [id]); //删除设备
            return { success: true };
        });
    }
}