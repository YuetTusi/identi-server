import { Context } from 'egg';

// async function permissionCheck(mysql: any, id: string) {

//     const CHECK_SQL = `
//             SELECT DISTINCT s.id,s.pid,s.level,s.name,s.key,s.type
//             FROM user u 
//             INNER JOIN user_role ur
//             ON u.id=ur.user_id
//             INNER JOIN role r
//             ON ur.role_id=r.id
//             INNER JOIN role_resource rr
//             ON r.id=rr.role_id
//             INNER JOIN resource s
//             ON rr.resource_id=s.id
//             WHERE u.id=?
//             ORDER BY s.level ASC,s.seq ASC;
//         `;

//     const data = await mysql.query(CHECK_SQL, [id]);

//     console.log(data);

// }

/**
 * 登录校验
 */
export default function (options: any, _app: any) {

    return async (ctx: Context, next: any) => {
        const { helper } = ctx;
        const { JWT_KEY } = options; //应用KEY
        // const { mysql } = app;
        const token = ctx.request.get('Authorization');
        console.log(`登录Auth验证 token=${token}`);
        //TODO:在此处验证JWT_Token是否合法
        const payload = helper.jwtVerify(token, JWT_KEY);

        if (payload === '') {
            ctx.status = 401;
            ctx.body = {
                code: 2,
                data: '用户未登录'
            };
        } else {
            //已成功登录 Do Next
            await next(payload);
        }
    }
}