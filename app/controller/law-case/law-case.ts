import { Controller } from 'egg';

/**
 * 案件
 */
export default class LawCaseController extends Controller {


    /**
     * 添加案件
     * @param data 案件数据
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
