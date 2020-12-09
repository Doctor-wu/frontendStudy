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



### 进度监测

```javascript
config: {
    onUploadProgress(e){
        // e.loaded 已经上传的
        // e.total 总共的值
    }
}
```



## 切片上传，断点续传，秒传

### 主要实现思路

- 现在前端用Blob接收上传的文件

- 然后把文件切成n段用一个partList组织起来并通过web-worker计算文件的总哈希值

  ```javascript
  /* eslint-disable no-restricted-globals */
  self.importScripts('https://cdn.bootcss.com/spark-md5/3.0.0/spark-md5.js');
  self.onmessage = async function (event) {
      let {partList} = event.data;
      let spark = new self.SparkMD5.ArrayBuffer();
      let percent = 0;//总体计算hash的百分比
      let perSize = 100 / partList.length;//每计算完一个part,相当于完成了百分之几 25%
  
      // 将chunk<Blob>转换成Arraybuffer
      let buffers = await Promise.all(partList.map(({chunk, size}) => new Promise((resolve => {
              const reader = new FileReader();
              reader.readAsArrayBuffer(chunk);
              reader.onload = function (event) {
                  percent += perSize;
                  self.postMessage({percent: Number(percent.toFixed(2))});
                  resolve(event.target.result);
              }
          }
      ))));
  
      //let buffers = await Promise.all(partList.map(({ chunk, size }) => chunk.ArrayBuffer()));
      buffers.forEach(buffer => {
          spark.append(buffer);
      });
      //通知主进程，当前的哈希已经全部完成，并且把最终的hash值给主进程发过去
      self.postMessage({percent: 100, hash: spark.end()});
      self.close();
  }
  
  //File => 多个 Blob => 读取Blob读成ArrayBuffer => spark计算哈希值
  //fs.readFile('./dog.jpg'); Buffer
  
  ```

  

- 计算完哈希值后拿哈希值和文件拓展名拼出最后的文件名，并给每个chunk分配chunk_name；

  ```typescript
  /**
       * 转换partList，使每个chunk都有filename和chunk_name
       * @param partList
       * @param filename
       */
      function transformParts(partList: Part[], filename: string) {
          partList.forEach((chunk, index) => {
              chunk.filename = filename;
              chunk.chunk_name = `${filename}-${index}`;
              chunk.percent = 0;
              chunk.loaded = 0;
          })
      }
  ```

  

- 从服务器拉取信息，判断该文件是否可以秒传，有哪些分片需要上传

  ```typescript
  async function verify(filename: string) {
          return await request({
              url: `/verify/${filename}`
          })
  }
  async function uploadParts(filename: string, partList: Part[]) {
          // 根据partList生成一个请求数组
          try {
              let {needUpload, uploadList} = await verify(filename);
              console.log(needUpload, uploadList)
              if (!needUpload) {
                  // 文件已存在于服务器端，无需上传
                  message.success("秒传成功!");
                  reset();
                  return;
              }
              let requests = createRequests(partList, uploadList, filename);
              await Promise.all(requests);
              let res = await request({
                  url: `/merge/${filename}`
              });
              if (res.success) {
                  message.success("文件切片上传成功");
              }
              reset();
          } catch (e) {
              console.error(e);
              message.error("上传暂停或失败")
              // await uploadParts(filename, partList);
          }
      }
  ```

  

- 然后给每个chunk都创建一个request，并通过**uploadedList**从筛选(截取)掉服务器上已有的文件

  ```typescript
   /**
       * 通过partList创建请求数组
       * @param partList
       * @param uploadedList
       * @param filename
       */
      function createRequests(partList: Part[], uploadedList: Uploaded[], filename: string): Array<Promise<any>> {
          return partList.filter((chunk: Part) => {
              let existsFile = uploadedList.find(upload => upload.filename === chunk.chunk_name);
              if (!existsFile) {
                  chunk.loaded = 0;
                  chunk.percent = 0;
                  return true;
              }
              console.log(existsFile.size, chunk.size)
              if (chunk.size > existsFile.size) {
                  chunk.loaded = existsFile.size;
                  chunk.percent = Number((existsFile.size / chunk.size * 100).toFixed(2));
                  return true;
              }
              return false;
          }).map(part => {
              return request({
                  url: `/upload/${part.filename}/${part.chunk_name}/${part.loaded}`,
                  method: "POST",
                  headers: {
                      "Content-type": "application/octet-stream"
                  },
                  setXHR: (xhr: XMLHttpRequest) => part.xhr = xhr,
                  onProgress: (event: ProgressEvent) => {
                      part.percent = Number((part.loaded! + event.loaded / part.size * 100).toFixed(2));
                      setPartList(([...partList]));
                  },
                  data: part.chunk.slice(part.loaded)
              })
          })
      }
  ```

  

- 最后每个分片都上传完毕后通知服务器合并分片，上传成功







