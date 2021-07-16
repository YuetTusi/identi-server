import { Controller } from 'egg';

/**
 * 字典
 */
export default class DictController extends Controller {

    /**
     * 按分类查询字典数据
     */
    public async getByCategory() {
        const { ctx } = this;
        const { category } = ctx.params;

        try {
            const data = await ctx.service.dict.dict.getByCategory(category);
            ctx.body = {
                code: 0,
                data,
                error: null
            };
        } catch (error) {
            ctx.body = {
                code: 1,
                data: null,
                error
            };
        }
    }
}
