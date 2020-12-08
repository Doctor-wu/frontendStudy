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
const multiparty_1 = __importDefault(require("multiparty"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const { PUBLIC_DIR } = require('./utils');
let app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
app.post('/upload', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let form = new multiparty_1.default.Form();
        form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return next(err);
            }
            let filename = fields.filename[0];
            let chunk = files.chunk[0];
            yield fs_extra_1.default.move(chunk.path, path_1.default.resolve(PUBLIC_DIR, filename), { overwrite: true });
            res.json({ success: true });
        }));
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