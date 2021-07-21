export const patchStyle = (el, prev, next) => {
  const style = el.style; // 获取样式
  if (next == null) {
    el.removeAttribute('style');
  } else {
    // diff style 新加的要加上  新的没有的要去掉

    if (prev) {
      for (const key in prev) {
        if (next[key] == null) { // 老的有 新的没有  要去掉
          style[key] = '';
        }
      }
    }

    for (const key in next) {
      style[key] = next[key];
    }
  }
}