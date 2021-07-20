import { Controller } from 'egg';

/**
 * 案件记录
 */
export default class RecController extends Controller {
    constructor(props: any) {
        super(props);
    }

    /**
     * 查询最近（最新）一条鉴定记录
     * @param id 案件id
     */
    public async getLastByCaseId() {
        const { service } = this.ctx;
        const { id } = this.ctx.params;

        try {
            const data = await service.rec.rec.getLastByCaseId(id)
            this.ctx.body = {
                code: 0,
                data,
                error: null
            }
        } catch (error) {
            this.ctx.body = {
                code: 1,
                data: null,
                error
            }
        }
    }

    /**
     * 新增案件记录
     * @param data 一条记录
     * @returns 影响的行数
     */
    public async insert() {

        const { service } = this.ctx;
        const { form } = this.ctx.request.body;

        try {
            const affectedRows = await service.rec.rec.insert(form)
            this.ctx.body = {
                code: 0,
                data: affectedRows,
                error: null
            }
        } catch (error) {
            this.ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }

    /**
     * 增加记录并更新案件状态
     */
    public async appendAndChangeState() {
        const { service } = this.ctx;
        const { form } = this.ctx.request.body;

        try {
            const success: boolean = await service.rec.rec.appendAndChangeState(form, form.state)
            // const success=true;
            this.ctx.body = {
                code: 0,
                data: success,
                error: null
            }
        } catch (error) {
            this.ctx.body = {
                code: 1,
                data: false,
                error
            }
        }
    }
}