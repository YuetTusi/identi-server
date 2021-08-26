import { Service } from 'egg';

/**
 * 角色Service
 */
class RoleService extends Service {

    private tableName = 'role';

    constructor(props) {
        super(props);
    }

    async create(data: any) {
        const { mysql } = this.app;
        const { affectedRows } = await mysql.insert(this.tableName, data);
        return affectedRows;
    }

    /**
     * 更新当前角色的资源
     * @param id 角色id
     * @param resourceId 新分配的资源id
     */
    async updateResourceById(id: string, resourceId: string[]) {
        const { mysql } = this.app;
        let insertCondition = '';
        let insertParam: string[] = [];

        for (let i = 0, l = resourceId.length; i < l; i++) {
            if (i === l - 1) {
                insertCondition += ' (?,?)';
            } else {
                insertCondition += ' (?,?), ';
            }
            insertParam.push(id, resourceId[i]);
        }

        const DEL_RESOURCE = 'DELETE FROM role_resource WHERE role_id=?';
        const INSERT_NEW_RESOURCE = 'INSERT INTO role_resource(role_id,resource_id) VALUES' + insertCondition;

        // console.log(INSERT_NEW_RESOURCE);
        // console.log(insertParam);

        return await mysql.beginTransactionScope(async (conn) => {
            await conn.query(DEL_RESOURCE, [id]);
            await conn.query(INSERT_NEW_RESOURCE, insertParam);
            return { success: true };
        });
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
        ORDER BY r.create_time DESC
        LIMIT ? OFFSET ?
        `;
        const FIND_TOTAL_ROW = `SELECT count(*) as 'total' FROM role WHERE 1=1`;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW)
        ]);
    }

    /**
     * 查询角色名称数量
     * @param name 角色名称
     */
    public async findNameCount(name: string) {
        const { mysql } = this.app;
        const FIND_NAME_COUNT = 'SELECT count(*) AS count FROM role WHERE name=?';
        const data = await mysql.query(FIND_NAME_COUNT, [name]);
        return data;
    }

    /**
     * 查询全部数据
     * @returns 
     */
    async getAll() {
        const { mysql } = this.app;
        let data = await mysql.select(this.tableName, {
            columns: ['id', 'name', 'desc', 'create_time', 'update_time']
        });
        return data;
    }

    /**
     * 删除角色
     * @param id 角色id
     */
    async del(id: string) {
        const { mysql } = this.app;

        const DEL_ROLE_RESOURCE = 'DELETE FROM role_resource WHERE role_id=?';
        const DEL_ROLE = 'DELETE FROM role WHERE id=?';

        return await mysql.beginTransactionScope(async (conn) => {
            await conn.query(DEL_ROLE_RESOURCE, [id]);
            await conn.query(DEL_ROLE, [id]);
            return { success: true };
        });
    }
}

export default RoleService;