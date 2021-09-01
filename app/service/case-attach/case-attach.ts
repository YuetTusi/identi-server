import { resolve } from 'path';
import { Service } from 'egg';

/**
 * 案件附件Service
 */
export default class CaseAttachService extends Service {

    private tableName = 'attachment';

    constructor(props: any) {
        super(props);
    }

    /**
     * 按id查询
     * @param id 附件id
     */
    async findById(id: string) {
        return await this.app.mysql.get(this.tableName, { id });
    }

    /**
     * 分页查询
     * @param condition 条件
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    async findByPage(condition: any, pageIndex: number, pageSize: number) {

        const { mysql } = this.app;
        const { id } = condition;

        const FIND_PAGE = `
            SELECT t.id,t.case_id,t.suspect_id,t.file_name,t.hash_name,t.update_time,t.create_time 
            FROM attachment t
            WHERE t.case_id=?
            ORDER BY t.create_time DESC
            LIMIT ? OFFSET ?
        `;
        const FIND_TOTAL_ROW = `SELECT count(*) as 'total' FROM attachment t WHERE t.case_id=?`;

        return await Promise.all([
            mysql.query(FIND_PAGE, [id, pageSize, (pageIndex - 1) * pageSize]),
            mysql.query(FIND_TOTAL_ROW, [id])
        ]);
    }

    /**
     * 查询案件附件
     * @param id  案件id
     */
    async findByCaseId(id: string) {
        const { mysql } = this.app;
        return await mysql.select(this.tableName, {
            columns: ['id', 'case_id', 'suspect_id', 'hash_name', 'file_name', 'create_time', 'update_time'],
            where: { case_id: id },
            orders: [['create_time', 'desc']]
        });
    }

    /**
     * 查询设备附件
     * @param id 设备id
     */
    async findBySuspectId(id: string) {
        const { mysql } = this.app;
        return await mysql.select(this.tableName, {
            columns: ['id', 'case_id', 'suspect_id', 'hash_name', 'file_name', 'create_time', 'update_time'],
            where: { suspect_id: id },
            orders: [['create_time', 'desc']]
        });
    }

    /**
     * 查询案件所有附件
     * @param caseId 案件id
     */
    async all(caseId: string) {
        const { mysql } = this.app;
        return await mysql.select(this.tableName, {
            columns: ['id', 'case_id', 'suspect_id', 'hash_name', 'file_name', 'create_time', 'update_time'],
            where: { case_id: caseId },
            orders: [['create_time', 'desc']]
        })
    }

    /**
     * 插入附件记录
     * @param data 附件记录
     * @returns 影响行数
     */
    async insert(data: any) {

        const { mysql } = this.app;
        const { affectedRows }: { affectedRows: number } = await mysql.insert(this.tableName, data);
        return affectedRows;
    }

    /**
     * 批量增加附件记录
     * @param data 多条附件数据
     */
    async multiInsert(data: any[]) {

        const { mysql } = this.app;
        const BATCH_INSERT = 'INSERT INTO attachment (id,case_id,suspect_id,file_name,hash_name,create_time,update_time) VALUES ';
        let stat: string[] = [];
        let param: any[] = [];
        data.forEach(item => {
            stat.push('(?,?,?,?,?,?,?)');
            param.push(item.id, item.case_id, item.suspect_id, item.file_name, item.hash_name, item.create_time, item.update_time);
        });

        const { affectedRows } = await mysql.query(BATCH_INSERT + stat.join(','), param);
        // console.clear();
        // console.log(BATCH_INSERT + stat.join(','));
        // console.log(param);
        return affectedRows;
    }

    /**
     * 删除附件记录
     * @param data 附件对象
     * @returns 影响行数
     */
    async del(data: any) {

        const { id, hash_name } = data;
        const { helper } = this.ctx;
        const { mysql } = this.app;

        const attachPath = resolve(process.cwd(), './attachment/', hash_name);
        const exist = await helper.fileExist(attachPath);

        if (exist) {
            await helper.delFile(attachPath);//删除文件
        }
        const { affectedRows }: { affectedRows: number } = await mysql.delete(this.tableName, { id });
        return affectedRows;
    }
}

