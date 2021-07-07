import { Controller } from 'egg';

/**
 * 资源表resource
 */
export default class ResourceController extends Controller {


    public async findByPage() {
        const { ctx } = this;
        const { condition, pageIndex, pageSize } = ctx.request.body;
        // console.log(ctx.request.body);
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
