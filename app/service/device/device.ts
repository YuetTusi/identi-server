import { Service } from "egg";

/**
 * 设备Service
 */
export default class CaseAttachService extends Service {

    private tableName = 'suspect';

    constructor(props: any) {
        super(props);
    }

    /**
     * 添加设备
     * @param data 设备数据
     */
    async insert(data: any) {
        const { mysql } = this.app;
        const { affectedRows } = await mysql.insert(this.tableName, data);
        return affectedRows;
    }
}