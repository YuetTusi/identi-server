import { Service } from 'egg';

/**
 * 案件记录
 */
export default class RecService extends Service {

    private tableName = 'case_rec';

    constructor(props: any) {
        super(props);
    }

    /**
     * 查询最近（最新）一条案件鉴定记录
     * @param id 案件id
     */
    public async getLastByCaseId(id: string) {
        const { mysql } = this.app;
        return await mysql.get(this.tableName, { case_id: id }, {
            columns: ['id', 'case_id', 'rec_time', 'rec_place', 'suggest', 'action_note', 'action_time', 'create_time', 'update_time'],
            orders: [['create_time', 'desc']]
        });
    }

    /**
     * 新增案件记录
     * @param data 一条记录
     */
    public async insert(data: any) {

        const { mysql } = this.app;
        const { affectedRows } = await mysql.insert(this.tableName, data);
        return affectedRows;
    }

    /**
     * 增加案件记录并更新案件状态
     */
    public async appendAndChangeState(data: any, state: number) {

        const { mysql } = this.app;
        const APPEND_REC = `INSERT INTO case_rec (id,case_id,rec_time,rec_place,suggest,action_note,action_time,create_time,update_time) 
            VALUES (?,?,?,?,?,?,?,?,?)`;
        const appendParams = [
            data.id, data.case_id, data.rec_time, data.rec_place,
            data.suggest, data.action_note, data.action_time,
            data.create_time, data.update_time
        ];
        const UPDATE_CASE_STATE = `UPDATE law_case set state=? WHERE id=?`;
        const updateStateParams = [state, data.case_id];

        return await mysql.beginTransactionScope(async (conn) => {
            await conn.query(APPEND_REC, appendParams);
            await conn.query(UPDATE_CASE_STATE, updateStateParams);
            return { success: true };
        });
    }
}