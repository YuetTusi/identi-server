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
                ctx.logger.info(`查无附件记录,附件id:${id}`);
                ctx.body = {
                    code: 0,
                    data: null,
                    error: null
                };
            } else {
                const { file_name, hash_name } = data;
                const attachPath = resolve(process.cwd(), './attachment/', hash_name);
                const size = await ctx.helper.getFileSize(attachPath);
                ctx.logger.info(`下载附件:attachment/${hash_name},原文件名:${file_name}`);
                await ctx.downloader(attachPath, file_name, {
                    'content-length': size.toString(),
                    'content-type': 'application/octet-stream'
                });
            }
        } catch (error) {
            ctx.logger.error('下载附件错误 @controller/attachment/download/doDownload', error);
            ctx.body = {
                code: 1,
                data: null,
                error
            };
        }
    }
}