import { Controller } from 'egg';

/**
 * 案件
 */
export default class LawCaseController extends Controller {

    /**
     * 按id查询案件
     */
    public async findById() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const data = await ctx.service.permission.lawCase.findById(id);
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
            const [data, total] = await ctx.service.permission.lawCase.findByPage(condition, Number(pageIndex), Number(pageSize));
            ctx.body = {
                code: 0,
                data: {
                    data,
                    total: total[0].total
                }
            }
        } catch (error) {
            ctx.logger.error(`案件分页查询失败 @controller/permission/law-case/findByPage`, error);
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
     * 查询案件存在数量
     */
    public async countByCaseName() {
        const { ctx } = this;
        const { case_name } = ctx.params;

        try {
            const [data] = await ctx.service.permission.lawCase.countByUserName(case_name);
            ctx.body = {
                code: 0,
                error: null,
                data
            }
        } catch (error) {
            ctx.logger.error(`案件重名验证失败(caseName:${case_name}) @controller/permission/law-case/countByCaseName`, error);
            ctx.body = {
                code: 1,
                error,
                data: null
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
            const affectedRows = await service.permission.lawCase.insert(form);

            ctx.body = {
                code: 0,
                data: affectedRows,
                error: null
            }
        } catch (error) {
            ctx.logger.error(`添加案件失败 @controller/permission/law-case/insert`, error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }

    /**
     * 更新案件
     */
    public async update() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { form } = ctx.request.body;

        form.id = id;
        try {
            const affectedRows = await ctx.service.permission.lawCase.update(form);
            ctx.body = {
                code: 0,
                error: null,
                data: affectedRows //影响行数
            }
        } catch (error) {
            ctx.logger.error(`更新案件失败(id:${id}) @controller/permission/law-case/update`, error);
            ctx.body = {
                code: 1,
                error,
                data: 0//影响行数
            }
        }
    }

    /**
     * 更新案件状态
     * @returns 返回影响行数
     */
    public async updateState() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await ctx.service.permission.lawCase.updateState(id, form.state);
            ctx.body = {
                code: 0,
                error: null,
                data: affectedRows //影响行数
            }
        } catch (error) {
            ctx.logger.error(`更新案件状态失败(id:${id}) @controller/permission/law-case/updateState`, error);
            ctx.body = {
                code: 1,
                error,
                data: 0//影响行数
            }
        }
    }

    /**
     * 删除案件
     */
    public async del() {
        const { ctx } = this;
        const { id } = ctx.params;

        try {
            const { success }: { success: boolean } = await ctx.service.permission.lawCase.del(id);
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
            ctx.logger.error(`删除案件失败(id:${id}) @controller/permission/law-case/del`, error);
            ctx.body = {
                code: 1,
                data: { success: false },
                error
            }
        }
    }
}
