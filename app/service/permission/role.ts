import { Service } from 'egg';

/**
 * 角色Service
 */
class RoleService extends Service {

    constructor(props) {
        super(props);
    }

    /**
     * 按主键查询角色
     * @param id 角色id
     */
    public async getById(id: string) {

        const { app } = this;

        const GET_BY_ID = `
        SELECT r.id,r.name,r.desc,r.create_time,r.update_time,s.id as 'resource_id',s.name,s.key,s.level,s.seq
        FROM role r
        INNER JOIN role_resource rs
        ON r.id=rs.role_id
        INNER JOIN resource s
        ON rs.resource_id=s.id
        WHERE r.id=?
        ORDER BY s.level ASC`;

        const data = await app.mysql.query(GET_BY_ID, [id]);
        return data;
    }

    /**
     * 分页查询
     * @param condition 条件
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    public async findByPage(_condition: any, pageIndex: number, pageSize: number) {
        const { app } = this;

        const FIND_PAGE = `
        SELECT r.id,r.name,r.desc, r.create_time,r.update_time 
        FROM role r
        WHERE 1=1
        LIMIT ? OFFSET ?
        `;
        const FIND_TOTAL_ROW = `SELECT count(*) as 'total' FROM role WHERE 1=1`;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW)
        ]);
    }
}

export default RoleService;