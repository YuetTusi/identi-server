import { Controller } from 'egg';

/**
 * 用户表user
 */
export default class UserController extends Controller {

    /**
     * 按id查询用户
     */
    public async getById() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const data = await ctx.service.permission.user.getById(id);
            ctx.body = {
                code: 0,
                error: null,
                data
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: null
            }
        }
    }

    /**
     * 按用户id查询所拥有角色
     */
    public async getRoleById() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const data = await ctx.service.permission.user.getRoleById(id);
            ctx.body = {
                code: 0,
                error: null,
                data
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: null
            }
        }
    }

    /**
     * 分页查询
     */
    public async findByPage() {
        const { ctx } = this;
        const { condition, pageIndex, pageSize } = ctx.request.body;

        try {
            const [data, total] = await ctx.service.permission.user.findByPage(condition, Number(pageIndex), Number(pageSize));
            ctx.body = {
                code: 0,
                data: {
                    data,
                    total: total[0].total
                }
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: {
                    data: null,
                    total: 0
                }
            }
        }
    }

    /**
     * 查询用户名存在数量
     */
    public async countByUserName() {
        const { ctx } = this;
        const { username } = ctx.params;

        try {
            const [data] = await ctx.service.permission.user.countByUserName(username);
            ctx.body = {
                code: 0,
                error: null,
                data
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: null
            }
        }
    }

    /**
     * 更新用户拥有角色
     */
    public async updateRoleById() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { roleId } = ctx.request.body;

        try {
            const { success }: { success: boolean } = await ctx.service.permission.user.updateRoleById(id, roleId);
            if (success) {
                ctx.body = {
                    code: 0,
                    data: { success },
                    error: null
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: { success: false },
                    error: null
                }
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                data: { success: false },
                error
            }
        }
    }

    /**
     * 创建用户
     */
    public async insert() {
        const { ctx } = this;
        const { form } = ctx.request.body;
        try {
            const { affectedRows } = await ctx.service.permission.user.insert(form);
            ctx.body = {
                code: 0,
                error: null,
                data: affectedRows //影响行数
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: 0
            }
        }
    }

    /**
     * 删除用户
     */
    public async del() {
        const { ctx } = this;
        const { id } = ctx.params;

        try {
            const { success }: { success: boolean } = await ctx.service.permission.user.del(id);
            if (success) {
                ctx.body = {
                    code: 0,
                    data: { success },
                    error: null
                }
            } else {
                ctx.body = {
                    code: 0,
                    data: { success: false },
                    error: null
                }
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                data: { success: false },
                error
            }
        }
    }
}
