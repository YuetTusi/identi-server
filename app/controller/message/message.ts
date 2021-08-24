import { Controller } from 'egg';

/**
 * 操作消息
 */
export default class MessageController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 查询用户消息
     * GET /message/:id
     */
    async getById() {

        const { ctx, ctx: { service } } = this;
        const { id } = ctx.params;

        try {
            const data = await service.message.message.getById(id);

            ctx.body = {
                code: 0,
                data,
                error: null
            }
        } catch (error) {
            ctx.logger.error(`按id查询消息失败(id:${id}) @controller/message/message/getByUser`, error);
            ctx.body = {
                code: 1,
                data: null,
                error
            }
        }
    }

    /**
     * 查询用户消息
     * GET /message/user/:id?read=0
     */
    async getByUser() {

        const { ctx, ctx: { service } } = this;
        const { id } = ctx.params;
        const search = ctx.request.query;

        try {
            const read: number | undefined = search.read ? Number(search.read) : undefined;
            const list = await service.message.message.getByUser(id, read);

            ctx.body = {
                code: 0,
                data: list,
                error: null
            }
        } catch (error) {
            ctx.logger.error(`用户消息查询失败(id:${id}) @controller/message/message/getByUser`, error);
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
        const { condition, pageIndex, pageSize } = ctx.request.body;

        try {
            const [data, total] = await ctx.service.message.message.findByPage(condition, Number(pageIndex), Number(pageSize));
            ctx.body = {
                code: 0,
                data: {
                    data,
                    total: total[0].total
                }
            }
        } catch (error) {
            ctx.logger.error(`消息分页查询失败 @controller/message/message/findByPage`, error);
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
     * 创建消息
     */
    async insert() {
        const { ctx, service } = this;
        const { form } = ctx.request.body;

        try {
            const affectedRows = await service.message.message.insert(form);
            ctx.body = {
                code: 1,
                data: affectedRows,
                error: null
            }
        } catch (error) {
            ctx.logger.error(`创建消息失败 @controller/message/message/insert`, error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }

    /**
     * 更新
     * PUT /message/:id
     */
    async update() {

        const { ctx, ctx: { service } } = this;
        const { id } = ctx.params;
        const { form } = ctx.request.body;

        try {
            const data = await service.message.message.getById(id);
            if (data === null) {
                ctx.body = {
                    code: 0,
                    data: 0,
                    error: null
                };
            } else {
                const next = {
                    ...data,
                    user_id: form.user_id,
                    case_id: form.case_id,
                    content: form.content,
                    read: form.read,
                    create_time: form.create_time,
                    update_time: form.update_time
                };
                const affectedRows = await service.message.message.update(next);
                ctx.body = {
                    code: 0,
                    data: affectedRows,
                    error: null
                }
            }

        } catch (error) {
            ctx.logger.error('更新消息失败 @controller/message/message/update', error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }

    /**
     * 更新已读状态
     * PUT /message/:id/read
     */
    async updateRead() {

        const { ctx, ctx: { service } } = this;
        const { id } = ctx.params;

        try {
            const affectedRows = await service.message.message.updateRead(id);
            ctx.body = {
                code: 0,
                data: affectedRows,
                error: null
            }

        } catch (error) {
            ctx.logger.error(`更新已读状态失败(id:${id}) @controller/message/message/updateRead`, error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }

    /**
     * 更新全部已读状态
     * PUT /message/user/:id
     */
    async updateReadAll() {

        const { ctx, ctx: { service } } = this;
        const { id } = ctx.params;

        try {
            const affectedRows = await service.message.message.updateReadAll(id);
            ctx.body = {
                code: 0,
                data: affectedRows,
                error: null
            }

        } catch (error) {
            ctx.logger.error(`更新全部已读状态失败(id:${id}) @controller/message/message/updateReadAll`, error);
            ctx.body = {
                code: 1,
                data: 0,
                error
            }
        }
    }
}