"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const utils_1 = require("./utils");
const { TEMP_DIR } = require('./utils');
let app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.post('/upload/:filename/:chunk_name/:start', function (req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { filename, chunk_name } = req.params;
        let start = isNaN(Number(req.params.start)) ? 0 : Number(req.params.start);
        let tempFileDir = path_1.default.resolve(TEMP_DIR, filename);
        let exists = yield fs_extra_1.default.pathExists(tempFileDir);
        let chunk_dir = path_1.default.resolve(TEMP_DIR, filename);
        !exists && (yield fs_extra_1.default.mkdirs(tempFileDir));
        let chunkFilePath = path_1.default.resolve(chunk_dir, chunk_name);
        let ws = fs_extra_1.default.createWriteStream(chunkFilePath, { start, flags: 'a' });
        req.on("end", () => {
            ws.close();
            res.json({ success: true });
        });
        req.pipe(ws);
    });
});
app.get('/verify/:filename', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { filename } = req.params;
        let publicFilePath = path_1.default.resolve(utils_1.PUBLIC_DIR, filename);
        let publicExists = yield fs_extra_1.default.pathExists(publicFilePath);
        if (publicExists) {
            res.json({
                success: true,
                needUpload: false
            });
            return;
        }
        let tempPath = path_1.default.resolve(TEMP_DIR, filename);
        let exists = yield fs_extra_1.default.pathExists(tempPath);
        let uploadList = [];
        if (exists) {
            let chunks = yield fs_extra_1.default.readdir(tempPath);
            uploadList = yield Promise.all(chunks.map((chunk) => __awaiter(this, void 0, void 0, function* () {
                let status = yield fs_extra_1.default.stat(path_1.default.resolve(tempPath, chunk));
                console.log(status.size, chunk);
                return {
                    filename: chunk,
                    size: status.size
                };
            })));
        }
        res.json({
            success: true,
            needUpload: true,
            uploadList: uploadList
        });
    });
});
app.get('/merge/:filename', function (req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        let { filename } = req.params;
        yield utils_1.mergeChunks(filename);
        res.json({ success: true });
    });
});
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
app.use(function (error, _req, res, _next) {
    res.status(error.status || http_status_codes_1.INTERNAL_SERVER_ERROR);
    res.json({
        success: false,
        error
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map