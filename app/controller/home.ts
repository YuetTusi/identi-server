import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;


    // const user = await ctx.service.permission.user.getById('a7b5ee69-d8ae-11eb-a03f-79a5cf1d245f');
    // try {
      const user = await ctx.service.permission.user.getByNameAndPassword('yuet', 'yuet');
      ctx.body = user;
    // } catch (error) {
    //   ctx.body = error;
    // }

    // ctx.body = await ctx.service.test.sayHi('egg');
    // ctx.body = await ctx.service;
  }
}
