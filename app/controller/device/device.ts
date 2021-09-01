import { Controller } from 'egg';

/**
 * 设备
 */
export default class DeviceController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 按id查询
     */
    public async findById() {
        const { ctx, logger, service } = this;
        const { id } = ctx.params;
        try {
            const data = await service.device.device.findById(id);
            ctx.body = {
                code: 0,
                data,
                error: null
            }
        } catch (error) {
            logger.error(`查询设备失败,id:${id} @controller/device/device/findById`, error);
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
        const { form, attachment } = ctx.request.body;

        console.clear();
        console.log(form);
        console.log(attachment);

        try {
            const result = await service.device.device.insert(form, attachment);

            ctx.body = {
                code: 0,
                data: result,
                error: null
            }
        } catch (error) {
            ctx.logger.error(`添加设备失败 @controller/device/device/insert`, error);
            ctx.body = {
                code: 1,
                data: { success: false },
                error
            }
        }
    }

    /**
     * 更新设备
     */
    public async update() {
        const { ctx } = this;
        const { id } = ctx.params;
        const { form } = ctx.request.body;

        form.id = id;
        try {

            const affectedRows = await ctx.service.device.device.update(form);
            ctx.body = {
                code: 0,
                error: null,
                data: affectedRows //影响行数
            }
        } catch (error) {
            ctx.logger.error(`更新设备失败(id:${id}) @controller/device/device/update`, error);
            ctx.body = {
                code: 1,
                error,
                data: 0//影响行数
            }
        }
    }

    /**
     * 删除设备
     */
    public async del() {
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
