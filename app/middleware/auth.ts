import { Context } from 'egg';

/**
 * 登录校验
 */
export default function (options: any) {

    return async (ctx: Context, next: any) => {
        const { helper } = ctx;
        const { JWT_KEY } = options; //应用KEY
        console.log('+++++进入中间件:login+++++++');
        const token = ctx.request.get('Authorization');
        console.log(`token=${token}`);

        //todo:在此处验证JWT_Token是否合法
        const payload = helper.jwtVerify(token, JWT_KEY);
        console.log(`paylod=${JSON.stringify(payload)}`);
        if (payload === '') {
            console.log('JWT验证失败');
            ctx.status = 401;
            ctx.body = {
                code: 2,
                data: '用户未登录'
            };
        } else {
            console.log('JWT验证成功，用户已登录');
            await next();
        }
    }
}