"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tree_1 = require("../../src/\u6570\u636E\u7ED3\u6784/Tree");
test("Tree-transverse", function () {
    var tree = new Tree_1.BinarySearchTree(new Tree_1.BinarySearchTreeNode(4));
    tree.insert(2);
    tree.insert(3);
    tree.insert(10);
    tree.insert(7);
    tree.insert(1);
    expect(__spread(tree.inorder()).map(function (n) { return n.key; })).toEqual([1, 2, 3, 4, 7, 10]);
});
