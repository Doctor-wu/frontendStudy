/*
 * 图片延迟加载的插件：只处理图片的延迟加载
 *   规定：
 *   1. 结构是 “图片放在一个盒子中，盒子是图片没有加载之前的占位；需要延迟加载的图片，src是空的，data-image存放真实图片地址，我们默认认为所有拥有data-image属性的图片都要做延迟加载；”
 *   <div>
 *		<img src="" alt="" data-image="images/1.jpg">
 *	 </div>
 *  
 *   2. 导入JS后，我们暴露出一个API（例如:init），只要执行init方法，就会开始进行图片延迟加载；而且我们还可以让其支持一些配置参数；
 *   {
 *      // 什么阶段做延迟加载
 *      threshold:[1],
 *      // 是否有动画效果：渐现的动画（需要我们给图片设定opacity/transition样式）
 *      animate:true,
 *      // 可配置具备哪些属性的进行延迟加载(要求属性值一定是真实图片的地址)
 *      attr:'data-image',
 *      // 每一张图片加载完触发的回调函数
 *      onload:function(img){}
 *   }
 */
(function () {
    class LazyImg {
        constructor(options) {
            // 把配置项挂载到实例上
            this.options = options;

            // 创造一个监听的实例
            let config = {
                threshold: options.threshold
            };
            this.observe = new IntersectionObserver(this.callback.bind(this), config);

            // 监听DOM元素
            this.watch();
        }

        // 原型方法
        watch() {
            let {
                attr,
                animate
            } = this.options;

            // 监听元素
            let allImgs = Array.from(document.querySelectorAll(`img[${attr}]`));
            allImgs.forEach(item => {
                // 如果需要实现渐现动画,我们需要设置样式
                if (animate) {
                    item.style.opacity = 0;
                    item.style.transition = "opacity .3s ease";
                }
                // 监听图片所在的DIV
                this.observe.observe(item.parentNode);
            });
        }
        callback(changes) {
            // 回调触发
            changes.forEach(item => {
                let {
                    isIntersecting,
                    target
                } = item;
                if (isIntersecting) {
                    this.lazyImg(target);
                    this.observe.unobserve(target);
                }
            });
        }
        lazyImg(target) {
            let {
                attr,
                animate,
                onload
            } = this.options;

            // 单张图片延迟加载
            let img = target.querySelector('img'),
                trueImg = img.getAttribute(`${attr}`);
            img.src = trueImg;
            img.onload = () => {
                img.style.display = 'block';
                if (animate) {
                    img.offsetWidth; // 刷新浏览器渲染队列
                    img.style.opacity = 1;
                }
                // 单张图片加载完都触发这个回调函数
                onload.call(this, img);
            };
            img.removeAttribute(`${attr}`);
        }

        // 静态对象
        static init(options = {}) {
            // 参数初始化
            options = Object.assign({
                threshold: [1],
                animate: true,
                attr: 'data-image',
                onload: function () {}
            }, options);
            // 创造当前类的一个实例
            return new LazyImg(options);
        }
    }

    // 暴露API
    if (typeof window !== "undefined") {
        window.LazyImg = LazyImg;
    }
    if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = LazyImg;
    }
})();