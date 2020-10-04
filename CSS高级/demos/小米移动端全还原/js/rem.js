const handleResize = utils.throttle(() => {
    let desW = 750;
    let winW = document.body.clientWidth;
    let ratio = winW / desW;
    document.querySelector('html').style.fontSize = ratio * 100 + 'px';
});

window.addEventListener('resize', handleResize);
handleResize();