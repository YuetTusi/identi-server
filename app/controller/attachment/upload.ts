
import { createWriteStream, WriteStream } from 'fs';
import { extname } from 'path';
import { Controller } from 'egg';

function task(reader: any, writer: WriteStream) {

    return new Promise((resolve, reject) => {

        reader.on('error', () => reject('error'));
        reader.on('end', () => resolve('success'));
        reader.pipe(writer);
    });
}

export default class UploadController extends Controller {

    constructor(props: any) {
        super(props);
    }

    /**
     * 上传附件
     */
    async doUpload() {

        const { ctx } = this;
        // const { querystring } = ctx.request;
        const hashname = ctx.helper.newId();
        const reader = await ctx.getFileStream();
        const ext = extname(reader.filename)
        const writer = createWriteStream(`attachment/${hashname}${ext}`);

        // console.log('原文件名:', reader.filename);
        // console.log('存储在:', `attachment/${hashname}${ext}`);
        // console.log('参数:', querystring);
        // console.log(JSON.stringify(reader.fields)); //获取FormData额外参数

        try {
            await task(reader, writer);
            ctx.status = 200;
        } catch (error) {
            ctx.status = 500;
        } finally {
            ctx.body = {
                filename: reader.filename,
                hashname: hashname + ext,
                dir: 'attachment'
            }
        }

        // reader.pipe(writer);

        // console.log('原文件名:', reader.filename);
        // console.log('存储在:', `attachment/${hashname}${ext}`);
        // console.log('参数:', querystring);

        // ctx.body = {
        //     uid: hashname,
        //     filename: reader.filename,
        //     hashname: hashname + ext,
        //     querystring: parse(querystring)
        // };

        // reader.on('data', () => {
        //     ctx.body = {
        //         response: { status: 'uploading' }
        //     }
        // });
        // reader.on('error', (e) => {
        //     ctx.body = {
        //         response: { status: 'error' },
        //     }
        //     console.log(e);
        // });
        // reader.on('end', () => {
        //     ctx.body = {
        //         response: { status: 'success' }
        //     }
        //     console.log('and we are done parsing the form!');
        // });
        // writer.on('close', () => console.log('写流已关闭'));
    }
}