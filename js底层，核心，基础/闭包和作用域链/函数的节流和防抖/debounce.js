// function debounce(func, delay = 300, immediately = false) {
//     let timer = null;
//
//     return function anonymous(...params) {
//         let now = immediately && !timer;
//         clearTimeout(timer);
//
//         timer = setTimeout(() => {
//             timer = null;
//             !immediately ? func.apply(this, params) : null;
//         }, delay)
//
//         now ? func.apply(this, params) : null;
//     }
// }


// 利用惰性思想，immediately判断了一次之后就不用再次判断了
function debounce(func, delay = 500, immediately = false) {
    let timer;
    if (!immediately) {
        return function(...args) {
            timer && clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    } else {
        return function(...args) {
            timer && clearTimeout(timer);
            !timer && func.apply(this, args);
            timer = setTimeout(() => {
                timer = null;
            }, delay);
        }
    }
}



function handle() {
    console.log('OK')
}


submit.onclick = debounce(handle, 500, true);