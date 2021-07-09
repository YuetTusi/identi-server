import { Controller } from 'egg';

/**
 * 资源表resource
 */
export default class ResourceController extends Controller {

    /**
     * 查询用户所拥有的资源
     */
    public async getResourceByRoleId() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const data = await ctx.service.permission.resource.getByRoleId(id);
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
     * 查询所有资源，按层级返回数据
     */
    public async getResourceWithLevel() {
        const { ctx } = this;
        try {
            const data = await ctx.service.permission.resource.getAll();
            const levelData = ctx.helper.makeMenu(data);
            ctx.body = {
                code: 0,
                error: null,
                data: levelData
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
     * 查询全部
     */
    public async getAll() {
        const { ctx } = this;
        try {
            const data = await ctx.service.permission.resource.getAll();
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
            const [data, total] = await ctx.service.permission.resource.findByPage(condition, Number(pageIndex), Number(pageSize));
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
}
