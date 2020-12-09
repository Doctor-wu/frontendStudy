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
