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
            const exp = attr.value;
            // 处理指令
            if (this.isDirective(attr)) {
                const dir = attr.name.slice(2);

                this.execDir(dir, node, exp);
            }
            // 处理事件
            if (this.isEvent(attr)) {
                const dir = attr.name.slice(1);

                this.eventHandler(node, dir, exp);
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

    isEvent(attr) {
        return attr.name.startsWith("@");
    }

    eventHandler(node, evName, fnName) {
        const fn = this.vm.$options.methods && this.vm.$options.methods[fnName];
        node.addEventListener(evName, () => {
            fn && fn.apply(this.vm);
        })
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

    model(node, exp) {
        // 初始化数据并观察数据
        this.update(node, exp, "model");

        // 监听表单控件输入
        node.addEventListener("input", (ev) => {
            this.vm[exp] = ev.target.value;
        })
    }

    modelUpdater(node, value) {
        node.value = value;
    }
}