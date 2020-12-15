"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Folder = /** @class */ (function () {
    function Folder(name, parent, children) {
        if (children === void 0) { children = []; }
        this.name = name;
        this.parent = parent;
        this.children = children;
        this.name = name;
        this.children = children;
        this.parent = parent || undefined;
    }
    Folder.prototype.add = function (item) {
        this.children.push(item);
        item.parent = this;
        return this;
    };
    Folder.prototype.show = function () {
        console.log("\u6587\u4EF6\u5939: " + this.name);
        this.children.forEach(function (child) { return child.show(); });
        return this;
    };
    Folder.prototype.remove = function () {
        var _this = this;
        if (this.parent) {
            this.parent.children.forEach(function (child, index) {
                if (child === _this) {
                    _this.parent.children.splice(index, 1);
                }
            });
        }
        else {
            console.log('cannot delete the root Folder');
        }
        return this;
    };
    return Folder;
}());
var File = /** @class */ (function () {
    function File(name, parent) {
        this.name = name;
        this.parent = parent;
        this.name = name;
        this.parent = parent;
    }
    File.prototype.show = function () {
        console.log("\u6587\u4EF6: " + this.name);
        return this;
    };
    return File;
}());
var root = new Folder('root');
var myInfo = new Folder('myInfo');
var myPhoto = new File('myPhoto');
myInfo.add(myPhoto);
var other = new Folder('other');
var otherFile = new File('otherFile');
other.add(otherFile);
root.add(myInfo);
root.add(other);
root.show();
