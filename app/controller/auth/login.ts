import { Controller } from 'egg';

/**
 * 用户登录
 */
class LoginController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 按id查询登录用户及角色
     */
    public async getById() {
        const { ctx, service } = this;
        const { id } = ctx.params;

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

    /**
     * 登录验证
     */
    public async valid() {
        const { app, ctx, service } = this;
        const { username, password } = ctx.request.body;

        try {
            const data: any[] = await service.permission.user.getByNameAndPassword(username, password);

            if (data.length === 0) {
                ctx.body = {
                    code: 0,
                    success: false,
                    data,
                    error: null
                }
            } else {

                const role = data.map(i => i.role_name);
                ctx.body = {
                    code: 0,
                    success: true,
                    data: {
                        uid: data[0].id,
                        role: role[0] === null ? [] : role,
                        token: ctx.helper.jwtSign(data[0].id, app.config.keys)
                    },
                    error: null
                }
            }
        } catch (error) {
            ctx.logger.error('用户登录失败 @controller/auth/login/valid', error);
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