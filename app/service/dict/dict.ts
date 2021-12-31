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
     * 按id查询
     * @param id 主键
     */
    async findById(id: string) {

        const { mysql } = this.app;
        return await mysql.get(this.tableName, { id });
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

    /**
     * 分页查询
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    async findByPage(condition: any, pageIndex: number = 1, pageSize: number = 20) {
        const { app, ctx } = this;
        let sqlCondition = '';
        let sqlParams: any[] = [];

        if (!ctx.helper.isNullOrUndefinedOrEmpty(condition.category)) {
            sqlCondition += ' AND category=? ';
            sqlParams = sqlParams.concat([condition.category]);
        }

        const FIND_PAGE = `SELECT 
            d.id,d.name,d.value,d.seq,d.category
            FROM dict d 
            WHERE 1=1 ${sqlCondition}
            ORDER BY d.category ASC, d.seq ASC
            LIMIT ? OFFSET ?`;

        const FIND_TOTAL_ROW = `
            SELECT count(*) as 'total' FROM dict WHERE 1=1 ${sqlCondition}
            `;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [...sqlParams, pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW, [...sqlParams])
        ]);
    }

    /**
     * 添加字典
     * @param data  
     */
    async insert(data: any) {
        const { mysql } = this.app;
        const { affectedRows } = await mysql.insert(this.tableName, data);
        return affectedRows;
    }

    /**
     * 更新字典
     * @param data 
     */
    async update(data: any) {
        const { mysql } = this.app;
        const { affectedRows } = await mysql.update(this.tableName, data);

        return affectedRows;
    }

    /**
     * 删除字典
     * @param id 主键
     */
    async del(id: string) {
        const { mysql } = this.app;
        const { affectedRows } = await mysql.delete(this.tableName, { id });
        return affectedRows;
    }
}

export default DictService;