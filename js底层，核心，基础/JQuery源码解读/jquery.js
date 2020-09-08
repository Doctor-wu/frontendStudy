(function(global, factory) {
    // 浏览器运行的时候 global->window
    // factory=>回调函数 function (window, noGlobal) {...}
    "use strict";
    if (typeof module === "object" && typeof module.exports == "object") {
        // 此条件成立说明当前代码支持commonJS规范的（浏览器端不支持/node端支持）
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error('jQuery requires a window with a document')
                }
                return factory(w);
            }
    } else {
        // 浏览器端运行
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
    // 浏览器端执行的话
    // window => window
    // noGlobal => undefined => 意味着浏览器执行

    // noGlobal => true => 意味着node端执行
    "use strict";

    var version = "3.5.1",
        jQuery = function(selector, context) {
            // ...
        };

    // 在导入JQ（但没有把自己的jQuery/$暴露给全局），首先会把现有全局中叫做$/jQuery的存储起来，防止后面设置的$/jQuery会替换全局现有的
    var _jQuery = window.jQuery,
        _$ = window.$;


    jQuery.noConflict = function(deep) {
        // 转让 $ 的使用权
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        // deep 可以转让jQuery的使用权
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    }

    // 在闭包中把一些私有的信息暴露到全局使用：RETURN/WINDOW.XXX = XXX
    if (typeof noGlobal === "undefined") {
        // 浏览器端执行
        window.jQuery = window.$ = jQuery
    }

    return jQuery;
})

// typeof window !== "undefined"?window:this
// 区分浏览器环境还是node环境
// -> 浏览器端运行传递给global的是window
// -> node环境下传递给global的是global/模块



// typeof 存在暂时性死区TDZ：检测一个未声明过的变量，不会报错，结果是undefined