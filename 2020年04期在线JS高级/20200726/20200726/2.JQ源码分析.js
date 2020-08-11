const jquery = require("jquery");

(function (global, factory) {
	"use strict";
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			factory(global, true) :
			function (w) {
				if (!w.document) {
					throw new Error("jQuery requires a window with a document");
				}
				return factory(w);
			};
	} else {
		factory(global);
	}
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
	"use strict";

	var jQuery = function (selector, context) {
		// 创造的是init这个类的一个实例
		// 代码中让init.prototype=jQuery.prototype：所以最后创造的实例基于__proto__查找的时候，找的也是jQuery.prototype原型上的方法，所以我们也可以认为创造的是jQuery这个类的一个实例
		// ==>目的是控制jQuery执行的时候当做普通的函数执行，但是能创造属于自己的一个实例
		// ==>JQ的选择器：$()其实就是创建了JQ类的一个实例（“JQ对象”）
		return new jQuery.fn.init(selector, context);
	};

	// jQuery充分体现了函数的三种角色：普通函数、构造函数、普通对象
	// 1. 写在原型上的方法是供实例“JQ对象”调用的  $('.box').xxx()
	// 2. 写在jQuery对象上的私有属性方法  $.xxx()  =>一般提供一些工具类方法，供项目开发或者JQ内部调用的
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		// 获取JQ集合中的某一项（某一项是DOM对象）：返回结果不在是JQ实例
		get: function (num) {
			if (num == null) {
				return [].slice.call(this);
			}
			return num < 0 ? this[num + this.length] : this[num];
		},
		// 查找集合中的某一项，最后把某一项以新的JQ实例返回
		eq: function (i) {
			// +i ：转换为数字
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},
	};

	// 给jQuery原型和对象上扩展方法
	// 1. jQuery.extend() 向对象上扩展方法（完善类库）
	// 2. jQuery.fn.extend() 向原型上扩展方法（写JQ插件）
	jQuery.extend = jQuery.fn.extend = function () {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !isFunction(target)) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					copy = options[name];

					// Prevent Object.prototype pollution
					// Prevent never-ending loop
					if (name === "__proto__" || target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (jQuery.isPlainObject(copy) ||
							(copyIsArray = Array.isArray(copy)))) {
						src = target[name];

						// Ensure proper type for the source value
						if (copyIsArray && !Array.isArray(src)) {
							clone = [];
						} else if (!copyIsArray && !jQuery.isPlainObject(src)) {
							clone = {};
						} else {
							clone = src;
						}
						copyIsArray = false;

						// Never move original objects, clone them
						target[name] = jQuery.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	var rootjQuery = jQuery(document);
	var init = jQuery.fn.init = function (selector, context, root) {
		// ...
		root = root || rootjQuery;
		// selector：支持三种类型
		// 1. 字符串
		// $('<div></div>') : 创建DOM元素对象（返回结果是一个JQ实例）
		// $('.box a') : 正常基于选择器获取元素
		// return jQuery.makeArray(selector, this)  创建一个类数组集合（JQ的实例就是一个类数组集合，但集合中的每一项都是DOM对象）

		// 2. 节点（一般是元素对象 =>基于JS操作DOM获取的DOM对象）
		// =>把原生DOM对象转换为JQ对象（这样就可以调用JQ原型上的方法了）
		// this[0] = selector;
		// this.length = 1;
		// return this;

		// 3. 函数
		// => $(document).ready(function(){}) 等待DOM结构加载完成才会触发执行
		// => $(function(){})
		// return root.ready(selector);
	};
	init.prototype = jQuery.fn;

	if (typeof noGlobal === "undefined") {
		window.jQuery = window.$ = jQuery;
	}
});

// $()
// jQuery();