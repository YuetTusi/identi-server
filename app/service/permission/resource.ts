import dayjs from 'dayjs';
import { Service } from 'egg';

class ResourceService extends Service {

    private tableName = 'resource';

    constructor(props: any) {
        super(props);
    }

    /**
     * 查询全部数据
     * @returns 
     */
    async getAll() {
        const { mysql } = this.app;
        let data = await mysql.select(this.tableName, {
            columns: ['id', 'pid', 'name', 'key', 'type', 'level', 'seq', 'create_time', 'update_time'],
            orders: [['level', 'asc'], ['seq', 'asc']]
        });
        return data;
    }

    /**
     * 查询角色所拥有的资源
     * @param id 角色id
     */
    async getByRoleId(id) {
        const { app } = this;

        const QUERY_BY_USERID = `
        SELECT DISTINCT s.id,s.pid,s.level,s.name,s.key,s.type
        FROM role r
        INNER JOIN role_resource rr
        ON r.id=rr.role_id
        INNER JOIN resource s
        ON rr.resource_id=s.id
        WHERE r.id=?
        ORDER BY s.level DESC;
        `;

        return await app.mysql.query(QUERY_BY_USERID, [id]);
    }

    /**
     * 查询有上级资源的resource记录
     * @returns 
     */
    async getResourceHasParent() {
        const { mysql } = this.app;
        const SQL = `SELECT id,pid,name,\`key\`,type,level,seq,create_time,update_time
        FROM resource
        WHERE level<>2
        ORDER BY level ASC,seq ASC`;

        const data = await mysql.query(SQL);
        return data;
    }

    /**
     * 分页查询
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    async findByPage(condition: any, pageIndex: number = 1, pageSize: number = 20) {
        const { app, ctx } = this;
        let sqlCondition = '';
        let sqlParams: any[] = [];

        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition.id)) {
            sqlCondition += ' AND pid=? ';
            sqlParams = sqlParams.concat([condition.id]);
        }

        const FIND_PAGE = `
        SELECT 
        r.name,r.key,r.type,r.level,r.seq,
            (SELECT name FROM resource WHERE id = (SELECT pid FROM resource WHERE id=r.id)) AS 'pname',
        r.create_time,r.update_time,r.id,r.pid
        FROM resource r 
        WHERE 1=1 ${sqlCondition}
        ORDER BY level ASC, pid ASC
        LIMIT ? OFFSET ?`;

        const FIND_TOTAL_ROW = `
        SELECT count(*) as 'total' FROM resource WHERE 1=1 ${sqlCondition}
        `;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [...sqlParams, pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW, [...sqlParams])
        ]);
    }

    /**
     * 更新菜单顺序
     * @param id 主键id
     * @param seq 顺序
     */
    async updateSeq(id: string, seq: number) {

        const { mysql } = this.app;
        const updateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const SQL_UPDATE_SEQ = 'UPDATE resource SET seq=?,update_time=? WHERE id=?';
        const { affectedRows } = await mysql.query(SQL_UPDATE_SEQ, [seq, updateTime, id]);
        return affectedRows;
    }
}


export default ResourceService;