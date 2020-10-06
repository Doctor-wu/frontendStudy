function defineReactive(obj, key, val) {
    observe(obj[key]);

    // 创建该属性对应的dep，在get时会尝试收集依赖
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}: ${val}`);

            // 如果Dep.target存在则将其收集为依赖项
            Dep.target && dep.addDep(Dep.target);
            return val;
        },
        set(newVal) {
            if (newVal !== val) {
                observe(newVal)

                console.log(`set ${key}: ${newVal}`);
                val = newVal;

                // 数据发生变化时，通知依赖项进行更新
                dep.update();
                // watchers.forEach(watcher => watcher.update())
            }
        }
    })
}


function observe(obj) {
    if (typeof obj !== "object" || obj === null) {
        return;
    }

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key]);
    })
}


function proxy(obj, attr) {
    Object.keys(obj[attr]).forEach(prop => {
        Object.defineProperty(obj, prop, {
            get() {
                return obj[attr][prop];
            },

            set(val) {
                obj[attr][prop] = val;
            }
        })
    })
}




class DVue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;

        new Observer(this.$data);

        // 代理一下$data
        proxy(this, "$data");
        // 编译模板
        new Compiler(this.$el, this);
    }
}

// const watchers = [];

class Watcher {
    constructor(vm, exp, updateFn) {
        this.vm = vm;
        this.exp = exp;

        this.updateFn = updateFn;
        // watchers.push(this);

        // 让全局只有一个的Dep.target = 自己，然后读一下该Watcher对应的值，读取时，$data中对应的值的dep会将
        // Dep.target也就是这个watcher收集作一个依赖，将来若这个属性发生变化，就通知这个watcher进行更新

        Dep.target = this;
        this.vm[this.exp];
        Dep.target = null; // 收集完依赖后立即置空
    }

    update() {
        this.updateFn(this.vm[this.exp]);
    }
}

// 收集依赖
class Dep {
    constructor() {
        this.deps = [];
    }

    addDep(dep) {
        this.deps.push(dep);
    }

    update() {
        this.deps.forEach(dep => dep.update());
    }
}


class Observer {
    constructor(value) {
        this.value = value;

        this.walk(value);
    }

    walk(val) {
        observe(val);
    }
}