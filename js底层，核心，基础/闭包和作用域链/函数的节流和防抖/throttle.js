function throttle(func, delay = 300) {
    let timer = null,
        previous = 0;
    return function anonymous(...params) {
        let now = Date.now(),
            remaining = delay - (now - previous);
        if (remaining <= 0) {
            clearTimeout(timer);
            timer = null;
            previous = Date.now();
            func.apply(this, params);
        } else if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                previous = Date.now();
                func.apply(this, params);
            }, remaining)
        }
    }
}


function handleScroll() {
    console.log('scroll')
}

window.onscroll = throttle(handleScroll, 1000)