(function (global, factory) {
	// global=>window
	// factory=>回调函数  function (window, noGlobal) {...}
	"use strict";

	if (typeof module === "object" && typeof module.exports === "object") {
		// 此条件成立说明当前运行代码的环境支持CommonJS规范
		// （浏览器端不支持/NODE端是是支持的）
		module.exports = global.document ?
			factory(global, true) :
			function (w) {
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else {
		// 浏览器端运行
		factory(global);
	}

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
	// 浏览器端执行                 NODE端执行
	// window => window            window => global/模块
	// noGlobal => undefined       noGlobal => true
	"use strict";

	var version = "3.5.1",
		jQuery = function (selector, context) {
			// ...
		};

	// 在导入JQ（但并没有把自己的jQuery/$暴露给全局），首先会把现有全局中叫做$/jQuery的存储起来，防止自己后期设置的$/jQuery会替换全局现有的
	var _jQuery = window.jQuery,
		_$ = window.$;

	// 基于noConflict转移JQ对$/jQuery的使用权
	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}
		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}
		return jQuery;
	};

	// 在闭包中把一些私有的信息暴露到全局使用：RETURN/WINDOW.XXX=XXX
	if (typeof noGlobal === "undefined") {
		window.jQuery = window.$ = jQuery;
	}
	return jQuery;
});

// jQuery('.box')
// $('.box')



//============================
// typeof window !== "undefined" ? window : this
// 区分浏览器环境和NODE环境
// ->浏览器端运行传递给global的是window
// ->如果是在NODE环境下运行，传递给global的是global/模块
// typeof 存在暂时性死区：检测一个未被声明过的变量，不会报错，结果是undefined