import { Service } from 'egg';
import { Base64 } from 'js-base64';

class UserService extends Service {

    private tableName = 'user';

    constructor(props) {
        super(props);
    }

    /**
     * 按主键查询用户
     * @param id 用户表id
     */
    public async getById(id: string) {

        const { app } = this;

        const GET_USER_BY_ID = `
            SELECT u.id,u.username,u.mail,u.mobile,u.realname,u.desc,r.name as 'role_name' 
            FROM user u 
            LEFT OUTER JOIN user_role ur 
            on u.id=ur.user_id 
            LEFT OUTER JOIN role r 
            on ur.role_id=r.id 
            WHERE u.id=?;
        `;

        const data = await app.mysql.query(GET_USER_BY_ID, [id]);
        return data;
    }

    /**
     * 按主键查询用户所拥有角色
     * @param id 用户id
     */
    public async getRoleById(id: string) {

        const { app } = this;

        const GET_ROLE_BY_ID = `
            SELECT r.id,r.name,r.desc
            FROM user u
            INNER JOIN user_role ur
            ON u.id=ur.user_id
            INNER JOIN role r
            ON ur.role_id=r.id
            WHERE u.id=?
            `;

        const data = await app.mysql.query(GET_ROLE_BY_ID, [id]);
        return data;
    }

    /**
     * 登录验证
     * @param username 用户名
     * @param password 密码
     * @returns 返回用户ID及角色数据
     */
    public async getByNameAndPassword(username: string, password: string) {
        const { app } = this;
        const LOGIN_SQL = `
            SELECT u.id,r.name as 'role_name' 
            FROM user u 
            LEFT OUTER JOIN user_role ur 
            ON u.id=ur.user_id 
            LEFT OUTER JOIN role r 
            ON ur.role_id=r.id 
            WHERE u.username=? AND u.password=?;
        `;

        const data = await app.mysql.query(LOGIN_SQL, [username, Base64.encode(password)]);
        return data;
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

        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition?.username)) {
            sqlCondition += ' AND username like ? ';
            sqlParams = sqlParams.concat([`%${condition?.username}%`]);
        }

        const FIND_PAGE = `SELECT u.id,u.username,u.desc,u.mail,u.realname,u.mobile,u.create_time,u.update_time
        FROM user u 
        WHERE 1=1 ${sqlCondition}
        ORDER BY u.create_time DESC 
        LIMIT ? OFFSET ?`;
        const FIND_TOTAL_ROW = `SELECT count(*) as 'total' FROM user WHERE 1=1 ${sqlCondition}`;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [...sqlParams, pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW, [...sqlParams])
        ]);
    }

    /**
     * 查询用户名存在数量（验证增加重名验证）
     * @param username 用户名
     */
    public async countByUserName(username: string) {
        const { mysql } = this.app;
        const COUNT_USERNAME = 'SELECT count(*) AS "count" FROM user WHERE username=?';

        return await mysql.query(COUNT_USERNAME, [username]);
    }

    /**
     * 新增用户
     * @param data 用户数据
     */
    public async insert(data: any) {
        const { app } = this;
        data.password = Base64.encode(data.password);
        return await app.mysql.insert(this.tableName, data);
    }

    /**
     * 更新用户
     * @param id 用户id
     * @param data 用户数据
     * @returns 影响的行数
     */
    public async update(data: any) {
        const { app } = this;
        const { affectedRows } = await app.mysql.update(this.tableName, data);
        return affectedRows;
    }

    /**
     * 更新用户拥有角色
     * @param id 用户id
     * @param roleId 角色id（多条）
     */
    public async updateRoleById(id: string, roleId: string[] = []) {

        const { mysql } = this.app;
        let insertCondition = '';
        let insertParam: string[] = [];
        const DEL_ROLE = 'DELETE FROM user_role WHERE user_id=?';

        if (roleId.length === 0) {
            return await mysql.beginTransactionScope(async (conn) => {
                await conn.query(DEL_ROLE, [id]);
                return { success: true };
            });
        } else {
            for (let i = 0, l = roleId.length; i < l; i++) {
                if (i === l - 1) {
                    insertCondition += ' (?,?)';
                } else {
                    insertCondition += ' (?,?), ';
                }
                insertParam.push(id, roleId[i]);
            }
            const INSERT_NEW_ROLE = 'INSERT INTO user_role (user_id,role_id) VALUES ' + insertCondition;

            return await mysql.beginTransactionScope(async (conn) => {
                await conn.query(DEL_ROLE, [id]);
                await conn.query(INSERT_NEW_ROLE, insertParam);
                return { success: true };
            });
        }
    }

    /**
     * 删除用户
     * @param id 用户id
     */
    public async del(id: string) {
        const { mysql } = this.app;

        const DEL_USER_ROLE = 'DELETE FROM user_role WHERE user_id=?';
        const DEL_USER = 'DELETE FROM user WHERE id=?';

        return await mysql.beginTransactionScope(async (conn) => {
            await conn.query(DEL_USER_ROLE, [id]);
            await conn.query(DEL_USER, [id]);
            return { success: true };
        });
    }
}

export default UserService;