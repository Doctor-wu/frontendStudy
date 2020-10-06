function defineReactive(obj, key, val) {
    observe(obj[key]);

    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}: ${val}`);
            return val;
        },
        set(newVal) {
            if (newVal !== val) {
                observe(newVal)

                console.log(`set ${key}: ${newVal}`);
                val = newVal;
                update();
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


function update() {
    // 更新视图
}

const foo = {
    a: "a",
    b: "b",
    bar: {
        baz: "baz"
    }
};
observe(foo);

foo.a;
foo.a = "aaaaaaaaaaaaaaaaa";


foo.bar.baz
foo.bar.baz = "bazzzzzzzzzzzzzzzzzzzzzz"