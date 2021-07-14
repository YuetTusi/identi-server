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
        SELECT id,pid,name,\`key\`,type,level,seq,create_time,update_time 
        FROM resource 
        WHERE 1=1 ${sqlCondition}
        ORDER BY level ASC, seq ASC 
        LIMIT ? 
        OFFSET ?
        `;
        const FIND_TOTAL_ROW = `
        SELECT count(*) as 'total' FROM resource WHERE 1=1 ${sqlCondition}
        `;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [...sqlParams, pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW, [...sqlParams])
        ]);
    }
}


export default ResourceService;