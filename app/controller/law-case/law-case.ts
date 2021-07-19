import { Controller } from 'egg';

/**
 * 案件
 */
export default class LawCaseController extends Controller {

    /**
     * 分页查询
     */
    public async findByPage() {
        const { ctx } = this;
        const { condition, pageIndex, pageSize } = ctx.request.body;

        try {
            const [data, total] = await ctx.service.lawCase.lawCase.findByPage(condition, Number(pageIndex), Number(pageSize));
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

    /**
     * 添加案件
     */
    public async insert() {
        const { ctx, service } = this;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await service.lawCase.lawCase.insert(form);

            ctx.body = {
                code: 0,
                data: affectedRows,
                error: null
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }
}
