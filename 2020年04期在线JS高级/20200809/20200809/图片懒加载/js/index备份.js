let imageModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column'));

    // 数据绑定
    function bindHTML(data) {
        // 根据服务器返回的图片的宽高，动态计算出图片放在230容器中，高度应该怎么缩放
        data = data.map(item => {
            let {
                width,
                height
            } = item;
            item.height = height / (width / 230);
            item.width = 230;
            return item;
        });

        // 每三个为一组获取数据
        for (let i = 0; i < data.length; i += 3) {
            let group = data.slice(i, i + 3);

            // 实现每一列的降序
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });

            // 把一组的数据进行升序
            group.sort((a, b) => {
                return a.height - b.height;
            });

            // 分别把最小数据插入到最大的列中
            group.forEach((item, index) => {
                let {
                    height,
                    title,
                    pic
                } = item;
                let card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<a href="#">
                    <div class="lazyImageBox" style="height:${height}px">
                        <img src="" alt="" data-image="${pic}">
                    </div>
                    <p>${title}</p>
                </a>`;
                columns[index].appendChild(card);
            });
        }
    }

    // 实现图片的延迟加载
    /* 
     * IntersectionObserver 监听DOM对象，当DOM元素出现和离开视口的时候触发回调函数
     *      observer = new IntersectionObserver([callback],[options])
     *      => threshold 我们可以基于数组的方式管控，元素相对于视口的交叉位置，在什么程度下触发回调函数 
     * observer.observe([DOM元素])  监听
     * observer.unobserve([DOM元素])  移除监听
     */
    let lazyImageBoxs,
        observer = new IntersectionObserver(changes => {
            // changes包含所有监听DOM信息的
            changes.forEach(item => {
                let {
                    isIntersecting,
                    target
                } = item;
                if (isIntersecting) {
                    lazyImg(target);
                    observer.unobserve(target);
                }
            });
        }, {
            // 控制什么阶段触发回调函数
            threshold: [1]
        });

    function lazyFunc() {
        // !lazyImageBoxs ? lazyImageBoxs = Array.from(document.querySelectorAll('.lazyImageBox')) : null;
        lazyImageBoxs = Array.from(document.querySelectorAll('.lazyImageBox'));
        lazyImageBoxs = lazyImageBoxs.filter(item => {
            return item.querySelector('img').getAttribute('data-image');
        });
        lazyImageBoxs.forEach(lazyImageBox => {
            observer.observe(lazyImageBox);
        });
    }

    function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            trueImg = img.getAttribute('data-image');
        img.src = trueImg;
        img.onload = function () {
            // 图片加载成功
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
    }

    // 无限下来加载
    let bottomBox = document.querySelector('.bottomBox'),
        isLoadMore = false,
        observer2 = new IntersectionObserver(async changes => {
            console.log(changes);
            let isIntersecting = changes[0].isIntersecting;
            if (isIntersecting) {
                // 到达底部了
                if (isLoadMore) return;
                isLoadMore = true;
                await init();
                isLoadMore = false;
            }
        }, {
            threshold: [0]
        });
    observer2.observe(bottomBox);

    async function init() {
        let data = await utils.ajax('./data.json');
        bindHTML(data);
        setTimeout(lazyFunc, 500);
    }

    return {
        init
    }
})();
imageModule.init();