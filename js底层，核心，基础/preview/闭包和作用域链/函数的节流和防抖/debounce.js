function debounce(func, delay = 300, immediately = false) {
    let timer = null;

    return function anonymous(...params) {
        let now = immediately && !timer;
        clearTimeout(timer);

        timer = setTimeout(() => {
            timer = null;
            !immediately ? func.apply(this, params) : null;
        }, delay)

        now ? func.apply(this, params) : null;
    }
}


function handle() {
    console.log('OK')
}


submit.onclick = debounce(handle, 500, true)