import { Controller } from 'egg';

/**
 * 我的案件
 */
export default class DefaultController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 按id查询案件
     */
    public async findById() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const data = await ctx.service.default.default.findById(id);
            ctx.body = {
                code: 0,
                data: data.length > 0 ? data[0] : null,
                error: null
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                data: null,
                error
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
            const [data, total] = await ctx.service.default.default.findByPage(condition, Number(pageIndex), Number(pageSize));
            ctx.body = {
                code: 0,
                data: {
                    data,
                    total: total[0].total
                }
            }
        } catch (error) {
            console.log(error);
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