import express, {Request, Response, NextFunction} from 'express';
import logger from 'morgan';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';//500
import createError from 'http-errors';
import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';
import {TEMP_DIR, mergeChunks, PUBLIC_DIR} from './utils';

let app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));


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
