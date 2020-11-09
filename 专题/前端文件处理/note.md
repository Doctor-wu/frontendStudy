## 前端文件处理 

```html
<input id="uploadInp" type="file" accept="image/*" multiple> 

<script>
	let uploadInp = document.querySelector("#uplaodInp");
    uploadInp.onchange = function(){
        console.log(this.files) // 可以拿到用户上传的文件信息
        let file = this.files[0];
        // FileList {0: File, length: 1}
        // 每一项就是选择的文件 File
        // name
        // size 单位 Byte
        // type
        
        // 可以在这里通过size判断文件大小决定是否允许上传
        if(file.size > 1024){
            alert("上传的文件必须在1KB以内");
                return;
        }
        
        // 可以在这里判断文件的类型决定是否允许上传
        if(/(png|jpe?g|gif)$/i.test(file.type)){
            alert(`不允许上传${file.type}格式的文件`);
            return;
        }
    }
</script>
```

- #### accept可以让用户在选择的时候只能选择图片类型的文件

- #### multiple属性可以让用户上传多个文件



### 如何把文件对象用img标签显示出来

 ```javascript
let reader = new FileReader;
reader.readAsDataURL(file);
reader.onload = function(e){
    abbreImg.src = e.target.result;
}
 ```



### 把文件上传到服务器端

#### 方案1：基于FORM-DATA

```javascript
let form = new FormData();
formData.append("file", file);
formData.append("filename", file.name);

axios.post("/upload", formData, {
    headers: {
        "Content-Type": "mutipart/form-data"
    }
})
```

#### 方案2：基于BASE64

```javascript
// 封装FileReader方法
function fileReader(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = ev => resolve(ev.target.result);
    })
}

async function upload(file) {
    let base64 = await fileReader(file);
    let response = await axios.post("/upload_base64",qs.stringify({
        chunk: base64,
        filename: file.name
    }) , {
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    })
}
```











