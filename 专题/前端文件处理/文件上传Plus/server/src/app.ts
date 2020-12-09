import express, {Request, Response, NextFunction} from 'express';
import logger from 'morgan';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';//500
import createError from 'http-errors';
import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';
import {mergeChunks, PUBLIC_DIR} from "./utils";

const {TEMP_DIR} = require('./utils');

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));


app.post('/upload/:filename/:chunk_name/:start', async function (req: Request, res: Response, _next: NextFunction) {
    let {filename, chunk_name} = req.params;
    let start: number = isNaN(Number(req.params.start)) ? 0 : Number(req.params.start);
    let tempFileDir = path.resolve(TEMP_DIR, filename);
    let exists = await fs.pathExists(tempFileDir);
    let chunk_dir = path.resolve(TEMP_DIR, filename);
    !exists && await fs.mkdirs(tempFileDir);
    let chunkFilePath = path.resolve(chunk_dir, chunk_name);
    let ws = fs.createWriteStream(chunkFilePath, {start, flags: 'a'});
    req.on("end", () => {
        ws.close();
        res.json({success: true});
    })
    req.pipe(ws);
});


app.get('/verify/:filename', async function (req: Request, res: Response) {
    let {filename} = req.params;
    let publicFilePath = path.resolve(PUBLIC_DIR, filename);
    let publicExists = await fs.pathExists(publicFilePath);
    if (publicExists) {
        // 文件已存在public目录中，客户端无需上传，秒传成功
        res.json({
            success: true,
            needUpload: false
        });
        return;
    }

    let tempPath = path.resolve(TEMP_DIR, filename);
    let exists = await fs.pathExists(tempPath);
    let uploadList: any[] = [];
    if (exists) {
        let chunks = await fs.readdir(tempPath);
        uploadList = await Promise.all(chunks.map(async (chunk) => {
            let status = await fs.stat(path.resolve(tempPath, chunk));
            console.log(status.size, chunk)
            return {
                filename: chunk,
                size: status.size
            }
        }))
    }

    res.json({
        success: true,
        needUpload: true,
        uploadList: uploadList
    })
})


app.get('/merge/:filename', async function (req: Request, res: Response, _next: NextFunction) {
    let {filename} = req.params;
    await mergeChunks(filename);
    res.json({success: true});
})
// app.post('/upload', async function (req: Request, res: Response, next: NextFunction) {
//     let form = new multiparty.Form();
//     form.parse(req, async (err: any, fields, files) => {
//         if (err) {
//             return next(err);
//         }
//         let filename = fields.filename[0];//'dog.jpg'
//         let chunk = files.chunk[0];//{}
//         // console.log(filename, chunk);
//         await fs.move(chunk.path, path.resolve(PUBLIC_DIR, filename), {overwrite: true});
//         res.json({success: true});
//     });
// });
/**
 zuihao.png
 {
  fieldName: 'chunk',
  originalFilename: 'zuihao.png',
  path: '/tmp/soPbven17r30FJsEGip2aaAj.png',
  headers: {
    'content-disposition': 'form-data; name="chunk"; filename="zuihao.png"',
    'content-type': 'image/png'
  },
  size: 136213
}

 */

app.use(function (_req: Request, _res: Response, next: NextFunction) {
    next(createError(404));
});
app.use(function (error: any, _req: Request, res: Response, _next: NextFunction) {
    res.status(error.status || INTERNAL_SERVER_ERROR);
    res.json({
        success: false,
        error
    });
});
export default app;
