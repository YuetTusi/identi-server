import { Service } from 'egg';

/**
 * 案件管理
 */
export default class LawCaseService extends Service {

    private tableName = 'law_case';
    /**
     * 添加案件
     */
    async insert(data: any) {
        const { mysql } = this.app;
        const { affectedRows } = await mysql.insert(this.tableName, data);

        return affectedRows;
    }
}