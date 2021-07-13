import { Service } from 'egg';


class UserService extends Service {

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
            SELECT u.id,u.username,r.name as 'role_name' 
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
        // const data = await app.mysql.get(tableName, { username, password });

        const data = await app.mysql.query(LOGIN_SQL, [username, password]);
        return data;
    }

    public async findByPage(condition: any, pageIndex: number, pageSize: number) {

        const { app, ctx } = this;

        let sqlCondition = '';
        let sqlParams: any[] = [];

        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition.username)) {
            sqlCondition += ' AND username like ? ';
            sqlParams = sqlParams.concat([`%${condition.username}%`]);
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
}

export default UserService;