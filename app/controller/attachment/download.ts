import { createReadStream } from 'fs';
import { resolve } from 'path';
import { Controller } from 'egg';

/**
 * 下载附件
 */
export default class DownloadController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 下载附件
     */
    async doDownload() {

        const { ctx } = this;
        const { id } = ctx.query;

        try {
            const data = await ctx.service.caseAttach.caseAttach.findById(id);
            if (data === null) {
                ctx.body = {
                    code: 0,
                    data: null,
                    error: null
                };
            } else {
                const { file_name, hash_name } = data;
                const attachPath = resolve(process.cwd(), './attachment/', hash_name);

                ctx.set('Content-Type', 'application/octet-stream');
                ctx.attachment(file_name);
                ctx.body = createReadStream(attachPath);
            }
        } catch (error) {
            ctx.body = {
                code: 1,
                data: null,
                error
            };
        }
    }
}