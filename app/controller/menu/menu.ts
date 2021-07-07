import { Controller } from 'egg';

export default class MenuController extends Controller {


    public async getMenuByUserId() {
        const { ctx } = this;
        const { id } = ctx.params;
        const data = await ctx.service.menu.menu.getMenuByUserId(id);

        ctx.body = ctx.helper.makeMenu(data);
    }
}
