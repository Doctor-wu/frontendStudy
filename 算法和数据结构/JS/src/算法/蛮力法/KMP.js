"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KMP = void 0;
var KMP = /** @class */ (function () {
    function KMP() {
    }
    KMP.getNext = function (template) {
        var next = [-1], i, len, j;
        for (j = 1; j < template.length; j++) {
            for (len = j - 1; len >= 1; len--) {
                for (i = 0; i < len; i++) {
                    if (template[i] !== template[j - len + i])
                        break;
                }
                if (i === len) {
                    next[j] = len;
                    break;
                }
            }
            if (len < 1)
                next[j] = 0;
        }
        return next;
    };
    KMP.compare = function (mainStr, template) {
        var next = KMP.getNext(template), i = 0, j = 0, k = 0, ml = mainStr.length, tl = template.length;
        while (i <= ml && j < tl) {
            if (mainStr[i] === template[j]) {
                i++;
                j++;
            }
            else {
                k = next[j];
                if (k < 0) {
                    j = 0;
                    i++;
                }
                else {
                    j = k;
                }
            }
        }
        if (j === tl)
            return i - j;
        return -1;
    };
    return KMP;
}());
exports.KMP = KMP;
