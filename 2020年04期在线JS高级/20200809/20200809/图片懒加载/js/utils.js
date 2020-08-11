let utils = (function () {

	function getCss(element, attr) {
		let value = window.getComputedStyle(element)[attr],
			reg = /^\d+(px|rem|em)?$/i;
		if (reg.test(value)) {
			value = parseFloat(value);
		}
		return value;
	}

	function setCss(element, attr, value) {
		if (attr === "opacity") {
			element['style']['opacity'] = value;
			element['style']['filter'] = `alpha(opacity=${value*100})`;
			return;
		}
		let reg = /^(width|height|margin|padding)?(top|left|bottom|right)?$/i;
		if (reg.test(attr)) {

			if (!isNaN(value)) {
				value += 'px';
			}
		}
		element['style'][attr] = value;
	}

	function setGroupCss(element, options) {
		for (let key in options) {
			if (!options.hasOwnProperty(key)) break;
			setCss(element, key, options[key]);
		}
	}

	function css(element) {
		let len = arguments.length,
			attr = arguments[1],
			value = arguments[2];
		if (len >= 3) {
			// 单一设置样式
			setCss(element, attr, value);
			return;
		}
		if (attr !== null && typeof attr === "object") {
			// 批量设置
			setGroupCss(element, attr);
			return;
		}
		// 获取样式
		return getCss(element, attr);
	}

	function offset(element) {
		let parent = element.offsetParent,
			top = element.offsetTop,
			left = element.offsetLeft;
		while (parent) {
			if (!/MSIE 8/.test(navigator.userAgent)) {
				left += parent.clientLeft;
				top += parent.clientTop;
			}
			left += parent.offsetLeft;
			top += parent.offsetTop;
			parent = parent.offsetParent;
		}
		return {
			top,
			left
		};
	}

	function ajax(url) {
		return new Promise(resolve => {
			let xhr = new XMLHttpRequest;
			xhr.open('get', url);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				}
			};
			xhr.send();
		});
	}


	/*
	 * debounce：实现函数的防抖（目的是频繁触发中只执行一次）
	 *  @params
	 *     func:需要执行的函数
	 *     wait:检测防抖的间隔频率
	 *     immediate:是否是立即执行（如果为TRUE是控制第一次触发的时候就执行函数，默认FALSE是以最后一次触发为准）
	 *  @return
	 *     可被调用执行的函数
	 */
	function debounce(func, wait = 500, immediate = false) {
		let timer = null;
		return function anonymous(...params) {
			let now = immediate && !timer;
			clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				// 执行函数:注意保持THIS和参数的完整度
				!immediate ? func.call(this, ...params) : null;
			}, wait);
			now ? func.call(this, ...params) : null;
		};
	}

	/*
	 * throttle：实现函数的节流（目的是频繁触发中缩减频率）
	 *   @params
	 *      func:需要执行的函数
	 *      wait:自己设定的间隔时间(频率)
	 *   @return
	 *      可被调用执行的函数
	 */
	function throttle(func, wait = 500) {
		let timer = null,
			previous = 0; //记录上一次操作时间
		return function anonymous(...params) {
			let now = new Date(), //当前操作的时间
				remaining = wait - (now - previous);
			if (remaining <= 0) {
				// 两次间隔时间超过频率：把方法执行即可
				clearTimeout(timer);
				timer = null;
				previous = now;
				func.call(this, ...params);
			} else if (!timer) {
				// 两次间隔时间没有超过频率，说明还没有达到触发标准呢，设置定时器等待即可（还差多久等多久）
				timer = setTimeout(() => {
					clearTimeout(timer);
					timer = null;
					previous = new Date();
					func.call(this, ...params);
				}, remaining);
			}
		};
	}

	return {
		css,
		offset,
		ajax,
		debounce,
		throttle
	};
})();