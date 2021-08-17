import { Controller } from 'egg';

/**
 * 菜单
 */
export default class MenuController extends Controller {

    /**
     * 用户菜单
     */
    public async getMenuByUserId() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const data = await ctx.service.menu.menu.getMenuByUserId(id);
            ctx.body = ctx.helper.makeMenu(data);
        } catch (error) {
            ctx.logger.error(`读取用户菜单失败(id:${id}) @controller/menu/menu/getMenuByUserId`, error);
        }
    }
}
