import { Controller } from 'egg';

/**
 * 用户登录
 */
class LoginController extends Controller {

    constructor(props: any) {
        super(props);
    }

    public async getById() {
        const { ctx, service } = this;
        const { id } = ctx.params;
        console.log('getById');
        if (id) {
            try {
                const data = await service.permission.user.getById(id);
                if (data.length === 0) {
                    ctx.body = {
                        code: 0,
                        success: false,
                        data,
                        error: null
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        success: true,
                        data: {
                            uid: data[0].id,
                            username: data[0].username,
                            role: data.map(i => i.role_name)
                        },
                        error: null
                    }
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    success: false,
                    data: null,
                    error: error.message
                }
            }

        } else {
            ctx.body = {
                code: 0,
                success: false,
                data: null,
                error: null
            }
        }
    }

    public async valid() {
        const { app, ctx, service } = this;
        const { username, password } = ctx.request.body;

        try {
            const data: any[] = await service.permission.user.getByNameAndPassword(username, password);

            // console.log(ctx.request.body);

            console.log(data);
            console.log(app.config.keys);
            // console.log(ctx.helper.jwtSign(data, app.config.keys))


            if (data.length === 0) {
                ctx.body = {
                    code: 0,
                    success: false,
                    data,
                    error: null
                }
            } else {

                ctx.body = {
                    code: 0,
                    success: true,
                    data: {
                        uid: data[0].id,
                        role: data.map(i => i.role_name),
                        token: ctx.helper.jwtSign(data[0].id, app.config.keys)
                    },
                    error: null
                }
            }
        } catch (error) {
            console.log(error.message);
            ctx.body = {
                code: 1,
                success: false,
                data: null,
                error
            }
        }
    }
}

export default LoginController;