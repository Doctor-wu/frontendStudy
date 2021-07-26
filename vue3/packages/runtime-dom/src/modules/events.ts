export const patchEvent = (el, key, value) => {
  // 对函数的缓存 
  const invokers = el.vei || (el.vei = {});

  const exists = invokers[key];

  if (exists && value) { // 需要绑定事件并且之前存在事件的情况下 去更新事件绑定
    exists.value = value;
  } else {
    const eventName = key.slice(2).toLowerCase();
    if (value) {
      let invoker = invokers[key] = createInvoker(value);
      el.addEventListener(eventName, invoker);
    } else {
      // 以前绑定了value 现在没有value
      // 移除事件
      el.removeEventListener(eventName, exists);
      invokers[key] = undefined;
    }
  }
}

function createInvoker(value: Function): Function {
  const invoker = (e) => {
    invoker.value(e);
  }
  invoker.value = value; // 为了能随时更改
  return invoker;
}