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
     * 更新用户拥有角色
     */
    public async updateRoleById() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { roleId } = ctx.request.body;

        console.log(id);
        console.log(roleId);
        console.log(typeof roleId);

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
}
