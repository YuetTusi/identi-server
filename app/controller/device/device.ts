import { Controller } from 'egg';

/**
 * 设备
 */
export default class DeviceController extends Controller {

    constructor(props: any) {
        super(props);
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
}