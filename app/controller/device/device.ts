import { Controller } from 'egg';

/**
 * 设备
 */
export default class DeviceController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 分页查询
     */
    public async findByPage() {
        const { ctx } = this;
        const { form } = ctx.request.body;
        const { condition, pageIndex, pageSize } = form;

        try {
            const [data, total] = await ctx.service.device.device.findByPage(condition, Number(pageIndex), Number(pageSize));
            ctx.body = {
                code: 0,
                data: {
                    data,
                    total: total[0].total
                }
            }
        } catch (error) {
            ctx.logger.error(`设备分页查询失败 @controller/device/device/findByPage`, error);
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
     * 添加设备
     */
    public async insert() {
        const { ctx, service } = this;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await service.device.device.insert(form);

            ctx.body = {
                code: 0,
                data: affectedRows,
                error: null
            }
        } catch (error) {
            ctx.logger.error(`添加设备失败 @controller/device/device/insert`, error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }

    /**
     * 删除设备
     */
    public async del(){
        const { ctx } = this;
        const { id } = ctx.params;

        try {
            const { success }: { success: boolean } = await ctx.service.device.device.del(id);
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
            ctx.logger.error(`删除设备失败(id:${id}) @controller/device/device/del`, error);
            ctx.body = {
                code: 1,
                data: { success: false },
                error
            }
        }
    }
}
