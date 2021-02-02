## 性能指标APIs



- ### performance.getEntriesByType("navigation")

  会得的一个数组

  ```javascript
  // tti:Time to Interactive 可交互时间
  let timing = performance.getEntriesByType('navigation')[0];
  
  // 计算tti = domInteractive - fetchStart
  let tti = timing.domInteractive - timing.fetchStart;
  ```

  

- ### PerformanceObserver

  ```javascript
  let ob = PerformanceObserver((list)=>{
      for(const entry of list.getEntries()){
          console.log(entry)
      }
  });
  
  // 监听longtask
  ob.observe({
      entryTypes:['longtask']
  })
  ```

  

- ### visibilitychange

  ```javascript
  // 监控用户是否还在当前页面
  let vEvent = 'visibilitychange';
  if(document.webkitHidden != undefined){
      vEvent = 'webkitvisibilitychange'
  }
  
  function visibilityChanged(){
      if(document.hidden || document.webkitHidden){
          console.log("Web page is hidden");
      }else{
          console.log("Web page is visible");
      }
  }
  
  document.addEventListener(vEvent,visibilityChanged, false);
  ```






- 判断用户网络状态

  ```javascript
  let connection = navigator.connection || navigator.mozConnection || nvaigator.webkitConnection;
  let type = connection.effectiveType;
  
  function updateConnectionStatus(){
      console.log(`connection type changed from ${type} to ${connection.effectiveType}`);
      type = connection.effectiveType;
  }
  
  connection.addEventListener('change', updateConnectionStatus);
  ```

  





- **DNS 解析耗时: domainLookupEnd - domainLookupStart**
- **TCP 连接耗时: connectEnd - connectStart**
- **SSL 安全连接耗时: connectEnd - secureConnectionStart**
- **网络请求耗时 (TTFB): responseStart - requestStart**
- **数据传输耗时: responseEnd - responseStart**
- **DOM 解析耗时: domInteractive - responseEnd**
- **资源加载耗时: loadEventStart - domContentLoadedEventEnd**
- **First Byte时间: responseStart - domainLookupStart**
- **白屏时间: responseEnd - fetchStart**
- **首次可交互时间: domInteractive - fetchStart**
- **DOM Ready 时间: domContentLoadEventEnd - fetchStart**
- **页面完全加载时间: loadEventStart - fetchStart**
- **http 头部大小： transferSize - encodedBodySize**
- **重定向次数：performance.navigation.redirectCount**
- **重定向耗时: redirectEnd - redirectStart**