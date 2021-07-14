import { Service } from 'egg';

/**
 * 菜单
 */
class MenuService extends Service {

    constructor(props: any) {
        super(props);
    }

    /**
     * 根据用户id查询匹配该角色的菜单
     * @param id 用户id
     * @returns 菜单数据
     */
    async getMenuByUserId(id: string) {
        const { app } = this;

        const QUERY_MENU = `
            SELECT DISTINCT s.id,s.pid,s.level,s.name,s.key,s.type
            FROM user u 
            INNER JOIN user_role ur
            ON u.id=ur.user_id
            INNER JOIN role r
            ON ur.role_id=r.id
            INNER JOIN role_resource rr
            ON r.id=rr.role_id
            INNER JOIN resource s
            ON rr.resource_id=s.id
            WHERE u.id=?
            ORDER BY s.level ASC,s.seq ASC;
        `;

        return await app.mysql.query(QUERY_MENU, [id]);
    }
}

export default MenuService;