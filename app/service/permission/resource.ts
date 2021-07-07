import { Service } from 'egg';

class ResourceService extends Service {

    constructor(props: any) {
        super(props);
    }

    /**
     * 分页查询
     * @param pageIndex 当前页
     * @param pageSize 页尺寸
     */
    async findByPage(condition: any, pageIndex: number = 1, pageSize: number = 20) {
        const { app } = this;

        console.log(condition);
        console.log(pageIndex);
        console.log(pageSize);

        const FIND_PAGE = `
        SELECT id,pid,name,\`key\`,type,level,create_time,update_time 
        FROM resource 
        ORDER BY level ASC, seq ASC 
        LIMIT ? 
        OFFSET ?
        `;
        const FIND_TOTAL_ROW = `
        SELECT count(*) as 'total' FROM resource
        `;

        return await Promise.all([
            app.mysql.query(FIND_PAGE, [pageSize, (pageIndex - 1) * pageSize]),
            app.mysql.query(FIND_TOTAL_ROW)
        ]);
    }
}


export default ResourceService;