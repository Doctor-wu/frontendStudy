/* 
 * 传统操作DOM消耗性能的原因：DOM的回流（重排）和重绘
 *   回流：当页面的布局或者几何信息发生变化，浏览器可能需要重新创建DOM树或者重新计算每一个元素在视口中的位置和大小(重新Layout)，重新计算完成后，让浏览器重新渲染
 *   =>回流必然会引发重绘
 *   + DOM元素的增删改导致的DOM结构变化
 *   + DOM的样式（例如：大小或者位置等）发生改变
 *   + 浏览器窗口大小改变(视口改变)
 *   + 页面第一次加载必然会有一次回流
 *   + ...
 * 
 *   重绘：元素样式发生改变，但是几何信息和结构信息没有改变，此时不需要回流，只需要浏览器把改变的元素重新渲染即可
 *   + color / background-color
 *   + ...
 */

// 需求：向#box盒子中动态插入5个span
// 当前代码会引发5次回流
/* for (let i = 1; i <= 5; i++) {
    let span = document.createElement('span');
    span.innerHTML = i;
    box.appendChild(span);
} */

// 优化思路：不是创建一个span就放置在页面中，而是把5个创建好，整体添加到页面中
// + createDocumentFragment  文档碎片
// + 字符串拼接
/* let frag = document.createDocumentFragment();
for (let i = 1; i <= 5; i++) {
    let span = document.createElement('span');
    span.innerHTML = i;
    frag.appendChild(span);
}
box.appendChild(frag);
frag = null; */

/* let str = ``;
for (let i = 1; i <= 5; i++) {
    str += `<span>${i}</span>`;
}
box.innerHTML = str; */

//=============
// 按照常理来讲，回流被触发两次，只不过现代浏览器为了减少样式更改所引发的回流，都新增了“浏览器的渲染队列”机制
// + 上一行代码是修改元素的样式，此时并没有直接通知浏览器去渲染，首先把它放置在浏览器渲染队列中，继续向下执行，把执行中遇到的修改样式的操作全部放置到浏览器的渲染队列中
// + 如果不在有修改样式的操作，或者遇到了获取样式的操作（盒子模型或者获取样式），则中断向队列中存放的操作，把现有的先渲染一次（引发一次回流），继续向下执行代码...
// ==>真实项目中，我们应该“读写分离”：把设置样式和获取样式的操作分离开
/* let box = document.getElementById('box');
setTimeout(() => {
    box.style.top = '100px';
    // console.log(box.style.top);
    box.style.left = '100px';
}, 1000); */

//=============
// 动画操作或者样式的改变，如果操作的是具备 position:absolute/fixed 再或者具备 opacity/filters 等这些属性样式的元素上，则可以优化回流的速度（不是不回流，只是优化了回流的速度 => 因为拥有这些样式的元素，他们渲染的时候是分层渲染的，我们修改这些元素的上的样式，在重新Layout和渲染的时候，只会对当前层进行重新处理）

// 还有一个更优化的手段：transform，基于transform修改元素的样式，直接跳过RENDER TREE和LAYOUT阶段，直接把更改的样式告诉“合成线程”去渲染，不会引发回流，只会重绘而已  =>开启了渲染的硬件加速


let box = document.getElementById('box');
box.onclick = function () {
    //立即回到这个位置
    box.style.transitionDuration = '0s';
    box.style.top = 0;
    box.style.left = 0;

    box.offsetLeft;

    //让其有动画效果
    box.style.transitionDuration = '1s';
    box.style.left = '400px';
};