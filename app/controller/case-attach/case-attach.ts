import { Controller } from 'egg';

/**
 * 案件附件
 */
export default class CaseAttachController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 分页查询
     */
    public async findByPage() {
        const { ctx } = this;
        const { form, pageIndex, pageSize } = ctx.request.body;

        try {
            const [data, total] = await ctx.service.caseAttach.caseAttach.findByPage(form, Number(pageIndex), Number(pageSize));
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
     * 添加附件记录
     */
    public async insert() {
        const { ctx, service } = this;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await service.caseAttach.caseAttach.insert(form);

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

    /**
     * 查询案件下全部附件
     */
    public async all() {
        const { ctx, service } = this;
        const { id } = ctx.params;

        try {
            const data = await service.caseAttach.caseAttach.all(id);

            ctx.body = {
                code: 0,
                data,
                error: null
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code: 1,
                data: null,
                error
            }
        }
    }

    /**
     * 删除附件记录
     */
    public async del() {
        const { ctx, service } = this;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await service.caseAttach.caseAttach.del(form);

            ctx.body = {
                code: 0,
                data: affectedRows,
                error: null
            }
        } catch (error) {
            ctx.logger.error(`删除附件记录失败 @controller/case-attach/case-attach/del`, error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }
}