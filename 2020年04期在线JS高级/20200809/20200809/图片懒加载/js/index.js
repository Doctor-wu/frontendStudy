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

    // 无限下来加载
    let bottomBox = document.querySelector('.bottomBox'),
        isLoadMore = false,
        observer2 = new IntersectionObserver(async changes => {
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
        /* LazyImg.init({
            threshold: [0.5],
            animate: false,
            onload(img) {
                // 只是为了测试
                img.style.filter = "grayscale(1)";
            }
        }); */
        LazyImg.init();
    }

    return {
        init
    }
})();
imageModule.init();