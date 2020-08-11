/*
 * 函数的防抖和节流
 *   防抖：在用户频繁触发的时候，我们只识别一次（识别第一次/识别最后一次）
 *   节流： 
 */

// 第一次点击，没有立即执行，等待500MS，看看这个时间内有没有触发第二次，有触发第二次说明在频繁点击，不去执行我们的事情（继续看第三次和第二次间隔...）；如果没有触发第二次，则认为非频繁点击，此时去触发；

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

function func() {
	console.log('OK');
}
// btn.onclick = debounce(func, 500, true);
// btn.onclick = func;
btn.onclick = throttle(func, 500);

//  防止频繁点击触发：设置标识进行判断 
/* let isClick = false;
btn.onclick = function () {
	if (isClick) return;
	isClick = true;
	setTimeout(() => {
		console.log('OK');
		isClick = false;
	}, 500);
}; */