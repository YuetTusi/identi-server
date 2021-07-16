import { Service } from 'egg';

/**
 * 字典
 */
class DictService extends Service {

    private tableName = 'dict';

    constructor(props: any) {
        super(props);
    }

    /**
     * 按字典分类category字段查询数据
     * @param category 字典分类
     * @returns 字典数据
     */
    async getByCategory(category: string) {
        const { mysql } = this.app;

        return await mysql.select(this.tableName, {
            columns: ['name', 'value'],
            where: { category },
            orders: [['seq', 'asc']]
        });
    }
}

export default DictService;