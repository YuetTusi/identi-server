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
}

export default UserService;