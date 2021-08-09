import { Context } from 'egg';


/**
 * 登录校验
 */
export default function (options: any, _app: any) {

    return async (ctx: Context, next: any) => {
        const { helper } = ctx;
        const { JWT_KEY } = options; //应用KEY
        const token = ctx.request.get('Authorization');
        // console.log(`登录Auth验证 token=${token}`);
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