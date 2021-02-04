## CSS对性能的影响

CSS selector是从右向左解析的



### CSS优化

- 降低CSS对渲染的阻塞，尽量早的加载CSS并解析
- 利用GPU完成动画
- 使用contain属性
- 使用font-display属性

### contain

```css
.news li {
    contain: layout; // 告诉浏览器，这个盒子无论怎么变化和外界都没有影响
}
```

