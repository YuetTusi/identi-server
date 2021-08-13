import { resolve } from 'path';
import { Service } from 'egg';

/**
 * 案件管理
 */
export default class LawCaseService extends Service {

    private tableName = 'law_case';

    /**
     * 按id查询
     * @param id 案件id
     */
    public async findById(id: string) {
        const { mysql } = this.app;

        const SELECT_BY_ID = `SELECT 
        c.id,c.check_id,c.identi_id,
        (SELECT concat_ws(' ',u.username,u.realname) FROM user u WHERE u.id=c.check_id) AS check_username,
        (SELECT concat_ws(' ',u.username,u.realname) FROM user u WHERE u.id=c.identi_id) AS identi_username,
        c.state,c.case_name,c.check_unit_name,c.officer_no,c.officer_name,c.security_case_no,c.security_case_type,
        c.security_case_name,c.handle_case_no,c.handle_case_type,c.handle_case_name,c.create_time,c.update_time 
        FROM law_case c WHERE c.id=?
        `;

        return await mysql.query(SELECT_BY_ID, [id]);
    }

    /**
     * 分页查询
     * @param condition 条件
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    public async findByPage(condition: any, pageIndex: number, pageSize: number) {

        const { app, ctx } = this;

        let sqlCondition = '';
        let sqlParams: any[] = [];

        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.case_name)) {
            sqlCondition += ' AND c.case_name like ? ';
            sqlParams = sqlParams.concat([`%${condition.case_name}%`]);
        }
        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.check_id)) {
            sqlCondition += ' AND c.check_id=? ';
            sqlParams = sqlParams.concat([condition.check_id]);
        }
        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.identi_id)) {
            sqlCondition += ' AND c.identi_id=? ';
            sqlParams = sqlParams.concat([condition.identi_id]);
        }
        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.state)) {
            sqlCondition += ' AND c.state=? ';
            sqlParams = sqlParams.concat([condition.state]);
        }

        const FIND_PAGE = `SELECT 
        c.id,c.identi_id,c.check_id,
        (SELECT concat_ws(' ',u.username,u.realname) FROM user u WHERE u.id=c.check_id) AS check_username,
        (SELECT concat_ws(' ',u.username,u.realname) FROM user u WHERE u.id=c.identi_id) AS identi_username,
        c.state,c.case_name,c.check_unit_name,c.officer_no,c.officer_name,c.security_case_no,c.security_case_type,
        c.security_case_name,c.handle_case_no,c.handle_case_type,c.handle_case_name,c.create_time,c.update_time 
        FROM law_case c 
        WHERE 1=1 ${sqlCondition} 
        ORDER BY c.create_time DESC,c.update_time DESC 
        LIMIT ? OFFSET ?`;
        const FIND_TOTAL_ROW = `SELECT count(*) as 'total' FROM law_case c WHERE 1=1 ${sqlCondition}`;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [...sqlParams, pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW, [...sqlParams])
        ]);
    }

    /**
     * 查询案件存在数量（验证增加重名验证）
     * @param case_name 案件名称
     */
    public async countByUserName(case_name: string) {
        const { mysql } = this.app;
        const COUNT_CASENAME = 'SELECT count(*) AS "count" FROM law_case WHERE case_name=?';

        return await mysql.query(COUNT_CASENAME, [case_name]);
    }

    /**
     * 添加案件
     * @param data 案件数据
     */
    async insert(data: any) {
        const { mysql } = this.app;
        const { affectedRows } = await mysql.insert(this.tableName, data);

        return affectedRows;
    }

    /**
     * 编辑案件
     * @param data 案件数据
     * @return 影响的行数
     */
    async update(data: any) {
        const { app } = this;
        const { affectedRows } = await app.mysql.update(this.tableName, data);
        return affectedRows;
    }

    /**
     * 更新案件状态
     * @param id 案件id
     * @param state 案件状态
     * @returns 影响的行数
     */
    async updateState(id: string, state: number) {
        const { mysql } = this.app;
        const prev = await mysql.get(this.tableName, { id });
        console.log(prev);
        if (prev === null) {
            return 0;
        } else {
            const next = { ...prev, state };
            const { affectedRows } = await mysql.update(this.tableName, next, { where: { id } });
            return affectedRows;
        }
    }

    /**
     * 删除案件
     * @param id 案件id 
     */
    async del(id: string) {

        const { mysql } = this.app;
        const { helper } = this.ctx;
        const DEL_CASE_ATTACH = 'DELETE FROM attachment WHERE case_id=?';
        const DEL_CASE_REC = 'DELETE FROM case_rec WHERE case_id=?';
        const DEL_LAWCASE = 'DELETE FROM law_case WHERE id=?';

        const attachList: any[] = await mysql.select('attachment', {
            where: { case_id: id },
            columns: ['hash_name']
        });

        await helper.batchDelFile(
            attachList.map(i =>
                resolve(process.cwd(), './attachment/', i.hash_name)
            )
        ); //批量删除案件关联所有附件

        return await mysql.beginTransactionScope(async (conn) => {
            await conn.query(DEL_CASE_ATTACH, [id]); //删除案件关联的附件记录
            await conn.query(DEL_CASE_REC, [id]); //删除案件关联的鉴定记录
            await conn.query(DEL_LAWCASE, [id]); //删除案件
            return { success: true };
        });
    }
}