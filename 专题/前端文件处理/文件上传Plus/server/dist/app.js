"use strict";
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
let app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
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