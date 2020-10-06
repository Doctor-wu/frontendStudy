class Compiler {
    constructor(el, vm) {
        this.vm = vm;
        this.el = document.querySelector(el);

        if (this.el) {
            this.compile(this.el);
        }
    }

    compile(node) {
        const nodeChilds = node.childNodes;
        Array.from(nodeChilds).forEach(child => {
            if (this.isElement(child)) {
                this.complieElement(child);
                //判断是不是插值渲染
            } else if (this.isInser(child)) {
                this.compileInser(child);
            }
        })
    }


    isElement(node) {
        return node.nodeType === 1;
    }

    isInser(node) {
        return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

    compileInser(node) {
        // node.textContent = this.vm[RegExp.$1];
        this.update(node, RegExp.$1, "text");
    }

    complieElement(node) {
        const attrs = node.attributes;
        Array.from(attrs).forEach(attr => {
            // 处理指令
            if (this.isDirective(attr)) {
                const dir = attr.name.slice(2);
                const exp = attr.value;

                this.execDir(dir, node, exp);
            }
        })
        this.compile(node);
    }

    update(node, exp, dir) {
        // 初始化
        const fn = this[dir + "Updater"];
        fn && fn(node, this.vm[exp]);

        // 创建watcher，数据变化时更新
        new Watcher(this.vm, exp, function (value) {
            fn && fn(node, value);
        })
    }

    isDirective(attr) {
        return attr.name.startsWith("d-");
    }

    execDir(dir, node, exp) {
        // const updater = dir + "Updater";
        this[dir] && this[dir].call(this, node, exp);
    }

    text(node, exp) {
        this.update(node, exp, "text");
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    html(node, exp) {
        this.update(node, exp, "html");
    }

    htmlUpdater(node, value) {
        node.innerHTML = value;
    }
}