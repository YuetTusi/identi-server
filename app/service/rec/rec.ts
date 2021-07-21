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
     * 增加案件记录并更新案件
     * @param recData 鉴定记录数据
     * @param lawCaseData 案件数据
     */
    public async appendAndChangeCase(recData: any, lawCaseData: any) {

        const { mysql } = this.app;
        const APPEND_REC = `INSERT INTO case_rec 
            (id,case_id,rec_time,rec_place,suggest,action_note,action_time,create_time,update_time) 
            VALUES (?,?,?,?,?,?,?,?,?)`;
        const appendParams = [
            recData.id, recData.case_id, recData.rec_time, recData.rec_place,
            recData.suggest, recData.action_note, recData.action_time,
            recData.create_time, recData.update_time
        ];
        const UPDATE_CASE = `UPDATE law_case set check_id=?,identi_id=?,state=? WHERE id=?`;
        const updateCaseParams = [lawCaseData.check_id, lawCaseData.identi_id, lawCaseData.state, lawCaseData.id];

        return await mysql.beginTransactionScope(async (conn) => {
            await conn.query(APPEND_REC, appendParams);
            await conn.query(UPDATE_CASE, updateCaseParams);
            return { success: true };
        });
    }
}