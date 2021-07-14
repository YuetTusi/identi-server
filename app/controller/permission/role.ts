import { Controller } from 'egg';

/**
 * 资源表resource
 */
export default class ResourceController extends Controller {

    /**
     * 更新角色分配的资源
     */
    public async updateResourceById() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { resourceId } = ctx.request.body;

        try {
            const { success }: { success: boolean } = await ctx.service.permission.role.updateResourceById(id, resourceId);
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
     * 按id查询角色
     */
    public async getById() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const data = await ctx.service.permission.role.getById(id);
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
            const [data, total] = await ctx.service.permission.role.findByPage(condition, Number(pageIndex), Number(pageSize));
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
     * 查询全部角色
     */
    public async getAll() {
        const { ctx } = this;

        try {
            const data = await ctx.service.permission.role.getAll();
            ctx.body = {
                code: 0,
                data,
                error: null
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: null
            }
        }
    }
}