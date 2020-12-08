import express, {Request, Response, NextFunction} from 'express';
import logger from 'morgan';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';//500
import createError from 'http-errors';
import cors from 'cors';
import path from 'path';
import multiparty from "multiparty";
import fs from 'fs-extra';

const {PUBLIC_DIR} = require('./utils');

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));


app.post('/upload', async function (req: Request, res: Response, next: NextFunction) {
    let form = new multiparty.Form();
    form.parse(req, async (err: any, fields, files) => {
        if (err) {
            return next(err);
        }
        let filename = fields.filename[0];//'dog.jpg'
        let chunk = files.chunk[0];//{}
        // console.log(filename, chunk);
        await fs.move(chunk.path, path.resolve(PUBLIC_DIR, filename), {overwrite: true});
        res.json({success: true});
    });
});
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
