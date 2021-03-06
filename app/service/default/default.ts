import { Service } from 'egg';

/**
 * 我的案件
 */
export default class DefaultController extends Service {

    constructor(props: any) {
        super(props);
    }

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
        let sqlParams: any[] = [condition.identi_id]; //鉴定人id必传

        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.case_name)) {
            sqlCondition += ' AND c.case_name like ? ';
            sqlParams = sqlParams.concat([`%${condition.case_name}%`]);
        }
        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.check_id)) {
            sqlCondition += ' AND c.check_id=? ';
            sqlParams = sqlParams.concat([condition.check_id]);
        }
        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.state)) {
            sqlCondition += ' AND c.state=? ';
            sqlParams = sqlParams.concat([condition.state]);
        }

        const FIND_PAGE = `SELECT 
        c.id,
        (SELECT concat_ws(' ',u.username,u.realname) FROM user u WHERE u.id=c.check_id) AS check_username,
        (SELECT concat_ws(' ',u.username,u.realname) FROM user u WHERE u.id=c.identi_id) AS identi_username,
        c.state,c.case_name,c.check_unit_name,c.officer_no,c.officer_name,c.security_case_no,c.security_case_type,
        c.security_case_name,c.handle_case_no,c.handle_case_type,c.handle_case_name,c.create_time,c.update_time 
        FROM law_case c 
        WHERE c.identi_id=? ${sqlCondition} 
        ORDER BY c.create_time DESC 
        LIMIT ? OFFSET ?`;
        const FIND_TOTAL_ROW = `SELECT count(*) as 'total' FROM law_case c WHERE 1=1 AND c.identi_id=? ${sqlCondition}`;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [...sqlParams, pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW, [...sqlParams])
        ]);
    }
}