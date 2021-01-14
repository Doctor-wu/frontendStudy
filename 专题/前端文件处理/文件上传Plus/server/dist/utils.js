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
exports.mergeChunks = exports.splitChunks = exports.TEMP_DIR = exports.PUBLIC_DIR = exports.DEFAULT_SIZE = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.DEFAULT_SIZE = 1024 * 1024 * 100;
exports.PUBLIC_DIR = path_1.default.resolve(__dirname, 'public');
exports.TEMP_DIR = path_1.default.resolve(__dirname, 'temp');
const splitChunks = (filename, size = exports.DEFAULT_SIZE) => __awaiter(void 0, void 0, void 0, function* () {
    let filePath = path_1.default.resolve(__dirname, filename);
    const chunksDir = path_1.default.resolve(exports.TEMP_DIR, filename);
    yield fs_extra_1.default.mkdirp(chunksDir);
    let content = yield fs_extra_1.default.readFile(filePath);
    let i = 0, current = 0, length = content.length;
    while (current < length) {
        yield fs_extra_1.default.writeFile(path_1.default.resolve(chunksDir, filename + '-' + i), content.slice(current, current + size));
        i++;
        current += size;
    }
});
exports.splitChunks = splitChunks;
const pipeStream = (filePath, ws) => new Promise(function (resolve) {
    let rs = fs_extra_1.default.createReadStream(filePath);
    rs.on('end', () => __awaiter(this, void 0, void 0, function* () {
        yield fs_extra_1.default.unlink(filePath);
        resolve();
    }));
    rs.pipe(ws);
});
const mergeChunks = (filename, size = exports.DEFAULT_SIZE) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.resolve(exports.PUBLIC_DIR, filename);
    const chunksDir = path_1.default.resolve(exports.TEMP_DIR, filename);
    const chunkFiles = yield fs_extra_1.default.readdir(chunksDir);
    chunkFiles.sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1]));
    try {
        yield Promise.all(chunkFiles.map((chunkFile, index) => pipeStream(path_1.default.resolve(chunksDir, chunkFile), fs_extra_1.default.createWriteStream(filePath, {
            start: index * size
        }))));
        yield fs_extra_1.default.rmdir(chunksDir);
    }
    catch (e) {
        console.log(e);
    }
});
exports.mergeChunks = mergeChunks;
//# sourceMappingURL=utils.js.map