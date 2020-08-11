(function () {
    // 基于工厂设计模式，实现把Sub当作普通函数执行，但是也可以创造其实例
    function Sub() {
        return new Sub.init();
    }

    function init() {
        // 每一次创建实例都挂在一个私有的事件池（自定义事件池）
        this.listeners = {};
    }
    Sub.init = init;

    // 原型链的处理
    Sub.prototype = {
        constructor: Sub,
        // 向指定自定义事件的容器中追加方法
        on(type, func) {
            // 首先验证一下是否存在这个自定义事件，不存在创建一个
            !this.listeners.hasOwnProperty(type) ? this.listeners[type] = [] : null;
            let arr = this.listeners[type];
            if (!arr.includes(func)) {
                arr.push(func);
            }
        },
        // 从指定自定义事件的容器中移除方法
        off(type, func) {
            let arr = this.listeners[type];
            if (!arr) return;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === func) {
                    /* // splice删除是改变原始数组的：删除项后面的每一项索引都要向前提一位
                    // “数组塌陷”，这样的操作很容易带来问题
                    arr.splice(i, 1); */

                    // 为了防止塌陷导致的问题，我们在移除的时候，不要修改原始数组的结构 
                    arr[i] = null;
                    break;
                }
            }
        },
        // 通知指定自定义事件的容器中的方法执行
        fire(type, ...args) {
            let arr = this.listeners[type];
            if (!arr) return;
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (typeof item === "function") {
                    item.call(this, ...args);
                } else {
                    // 也会“数组塌陷”，我们下一轮循环还是从当前的索引开始即可
                    arr.splice(i, 1);
                    i--;
                }
            }
        }
    };
    init.prototype = Sub.prototype;

    window.Sub = Sub;
})();

(function () {
    function ModalPlugin(options) {
        return new init(options);
    }

    // 类的原型：公共的属性方法
    // 创建一个空对象，让它的__proto__指向Sub.init.prototype
    let subPro = Object.create(Sub.init.prototype);
    ModalPlugin.prototype = Object.assign(subPro, {
        constructor: ModalPlugin,
        // 相当于大脑，可以控制先干什么再干什么（命令模式）
        init() {
            // 创建DOM结构
            this.createDOM();

            // 基于事件委托实现点击事件的处理
            this.dpnDialog.addEventListener('click', ev => {
                let target = ev.target,
                    targetTag = target.tagName;

                // 点击的是关闭按钮
                if (targetTag === 'I' && target.className.includes("dpn-close")) {
                    this.close();
                    return;
                }

                // 点击的是底部按钮
                if (targetTag === "BUTTON" && target.parentNode.className.includes("dpn-handle")) {
                    let index = target.getAttribute("index"),
                        func = this.options.buttons[index]['click'];
                    if (typeof func === "function") {
                        func.call(this);
                    }
                }
            });

            // 实现拖拽效果
            if (this.options.drag) {
                this.dpnTitle.onmousedown = this.dragStart.bind(this);
            }

            // 通知init回调函数执行
            this.options.init.call(this);
        },
        // 创建DOM结构
        createDOM() {
            let {
                title,
                template,
                buttons,
                drag
            } = this.options;

            let frag = document.createDocumentFragment(),
                dpnDialog = document.createElement('div');
            dpnDialog.className = "dpn-dialog";
            dpnDialog.innerHTML = `
                <div class="dpn-title" style="cursor:${drag?'move':'default'}">
                    ${title}
                    <i class="dpn-close">x</i>
                </div>
                <div class="dpn-content">
                    ${
                        typeof template==="object" && template.nodeType?
                        template.outerHTML:
                        template
                    }
                </div>
                ${buttons.length>0?`<div class="dpn-handle">
                    ${buttons.map((item,index)=>{
                        return `<button index="${index}">
                            ${item.text}
                        </button>`;
                    }).join('')}
                </div>`:''}
            `;
            frag.appendChild(dpnDialog);

            let dpnModel = document.createElement('div');
            dpnModel.className = "dpn-model";
            frag.appendChild(dpnModel);

            document.body.appendChild(frag);
            frag = null;

            this.dpnDialog = dpnDialog;
            this.dpnModel = dpnModel;
            this.dpnTitle = dpnDialog.querySelector('.dpn-title');
        },
        // 控制它显示
        open() {
            this.dpnDialog.style.display = "block";
            this.dpnModel.style.display = "block";

            // 通知“已经打开”自定义事件执行
            this.fire('open');
        },
        // 控制其隐藏
        close() {
            this.dpnDialog.style.display = "none";
            this.dpnModel.style.display = "none";

            // 通知“已经关闭”自定义事件执行
            this.fire('close');
        },
        // 拖拽的一套处理规范
        dragStart(ev) {
            this.dragOption = {
                startX: ev.pageX,
                startY: ev.pageY,
                startL: this.dpnDialog.offsetLeft,
                startT: this.dpnDialog.offsetTop
            };
            document.onmousemove = this.dragMove.bind(this);
            document.onmouseup = this.dragEnd.bind(this);

            // 通知“拖拽开始”的自定义事件执行
            this.fire('dragstart', ev);
        },
        dragMove(ev) {
            let {
                startX,
                startY,
                startL,
                startT
            } = this.dragOption;
            let curL = ev.pageX - startX + startL,
                curT = ev.pageY - startY + startT;
            // 边界判断:因为盒子本身具备向左和向上移动盒子本身一半的样式
            let n = this.dpnDialog.offsetWidth,
                m = this.dpnDialog.offsetHeight,
                minL = 0 + n / 2,
                minT = 0 + m / 2,
                maxL = document.documentElement.clientWidth - n + n / 2,
                maxT = document.documentElement.clientHeight - m + m / 2;
            curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
            curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
            this.dpnDialog.style.left = curL + 'px';
            this.dpnDialog.style.top = curT + 'px';

            // 通知“拖拽中”的自定义事件执行
            this.fire('dragmove', ev);
        },
        dragEnd(ev) {
            document.onmousemove = null;
            document.onmouseup = null;

            // 通知“拖拽结束”的自定义事件执行
            this.fire('dragend', ev);
        }
    });

    function init(options = {}) {
        // 参数初始化:传递进来的配置项替换默认的配置项
        options = Object.assign({
            title: '系统提示',
            template: '',
            drag: true,
            buttons: [],
            init: function () {}
        }, options);

        // 继承Sub类中的私有属性:call继承
        Sub.init.call(this);

        // 把信息挂在到实例上：在原型等各个方法中，只要this是实例，都可以调用到这些信息
        this.options = options;
        this.init();
    }
    init.prototype = ModalPlugin.prototype;

    // 暴露到全局 && 支持ES6Module/CommonJS模块导入规范
    window.ModalPlugin = ModalPlugin;
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = ModalPlugin;
    }
})();