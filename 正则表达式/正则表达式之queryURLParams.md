##  正则表达式之queryURLParams 

```javascript
let str = "https:dtwu.club/?user=doctorwu&password=doctorwu666";

(function(){
    function queryURLParams(){
        let obj = {};
        this.replace(/([^?=#&]+)=([^?=#&]+)/g,(...args)=>{
            let [str, $1, $2] = args;
            obj[$1] = $2;
        });
        this.replace(/#([^?=#&]+)/g,(...args)=>{
            let [str, $1] = args;
            obj['HASH'] = $1;
        });
        return obj;
    }
    
    
    ["queryURLParams"].forEach(item=>{
        String.prototype[item] = eval(item);
    })
})()


str.queryURLParams(); // {user: "doctorwu", password: "doctorwu666", HASH: "Doctorwu"}
```

