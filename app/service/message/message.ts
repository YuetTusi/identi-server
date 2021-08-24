import dayjs from 'dayjs';
import { Service } from 'egg';

/**
 * 动作消息
 */
class MessageService extends Service {

    private tableName = 'message';

    constructor(props: any) {
        super(props);
    }

    /**
     * 按id查询
     * @param id 用户id
     */
    async getById(id: string) {

        const { app: { mysql } } = this;

        return await mysql.get(this.tableName, { id });
    }

    /**
     * 按用户id查询消息
     * @param id 用户id
     * @param read 已读标识（undefined为查询全部状态记录）
     */
    async getByUser(id: string, read?: number) {

        const { app: { mysql } } = this;

        let $where: Record<string, any> = {
            'user_id': id
        };

        if (read !== undefined) {
            $where = {
                ...$where,
                read
            }
        }

        return await mysql.select(this.tableName, {
            columns: ['id', 'user_id', 'case_id', 'content', 'read', 'create_time', 'update_time'],
            where: $where,
            roders: [[`update_time`, 'desc']]
        });
    }

    /**
     * 
     * @param data 数据
     */
    async insert(data: any) {

        const SQL_INSERT = `INSERT INTO message 
        (id,user_id,case_id,content,\`read\`,create_time,update_time)
        VALUES (?,?,?,?,?,?,?);`;

        const { mysql } = this.app;

        return await mysql.query(SQL_INSERT, [
            data.id,
            data.user_id,
            data.case_id,
            data.content,
            data.read,
            data.create_time,
            data.update_time
        ]);
    }

    /**
     * 更新已读状态
     * @param id 主键id
     */
    async update(next: any) {

        const { app } = this;
        const { affectedRows } = await app.mysql.update(this.tableName, next);
        return affectedRows;
    }

    /**
     * 更新已读状态
     * @param id 主键id
     */
    async updateRead(id: string) {

        const { app: { mysql } } = this;
        const data = await mysql.get(this.tableName, { id });
        const next = {
            ...data,
            read: 1,
            update_time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        };
        const { affectedRows } = await mysql.update(this.tableName, next);

        return affectedRows;
    }
    /**
     * 更新用户消息全部已读
     * @param id 用户id
     */
    async updateReadAll(id: string) {

        const { app: { mysql } } = this;
        const UPDATE_ALL_READ = `UPDATE message SET \`read\`=1 WHERE user_id=?`;

        const { affectedRows } = await mysql.query(UPDATE_ALL_READ, [id]);
        return affectedRows;
    }
}

export default MessageService;