import { Controller } from 'egg';

/**
 * 字典
 */
export default class DictController extends Controller {

    /**
     * 按id查询
     */
    public async findById() {
        const { ctx } = this;
        const { id } = ctx.params;

        try {
            const data = await ctx.service.dict.dict.findById(id);
            ctx.body = {
                code: 0,
                data,
                error: null
            };
        } catch (error) {
            ctx.logger.error(
                `字典查询失败(id:${id}) @controller/dict/dict/findById`,
                error
            );
            ctx.body = {
                code: 1,
                data: null,
                error
            };
        }
    }

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
            ctx.logger.error(
                `字典查询失败(category:${category}) @controller/dict/dict/getByCategory`,
                error
            );
            ctx.body = {
                code: 1,
                data: null,
                error
            };
        }
    }

    /**
     * 分页查询
     */
    public async findByPage() {
        const { ctx } = this;
        const { condition, pageIndex, pageSize } = ctx.request.body;

        try {
            const [data, total] = await ctx.service.dict.dict.findByPage(condition, Number(pageIndex), Number(pageSize));
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
     * 添加字典
     */
    public async insert() {
        const { ctx } = this;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await ctx.service.dict.dict.insert(form);
            ctx.body = {
                code: 0,
                data: {
                    affectedRows
                }
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: {
                    affectedRows: 0
                }
            }
        }
    }

    /**
     * 更新字典
     */
    public async update() {
        const { ctx } = this;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await ctx.service.dict.dict.update(form);
            ctx.body = {
                code: 0,
                data: {
                    affectedRows
                }
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: {
                    affectedRows: 0
                }
            }
        }
    }

    /**
     * 删除字典
     */
    public async del() {
        const { ctx } = this;
        const { id } = ctx.params;

        try {
            const affectedRows = await ctx.service.dict.dict.del(id);
            ctx.body = {
                code: 0,
                data: {
                    affectedRows
                }
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                error,
                data: {
                    affectedRows: 0
                }
            }
        }
    }
}
