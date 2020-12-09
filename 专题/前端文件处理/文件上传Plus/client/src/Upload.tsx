import React, {ChangeEvent, useEffect, useState} from 'react';
import {Row, Col, Input, Button, message, Table, Progress} from "antd";
import {DEFAULT_SIZE, request} from "./utils";


interface Part {
    chunk: Blob;
    size: number;
    filename?: string;
    chunk_name?: string;
    loaded?: number;
    percent?: number;
    xhr?: XMLHttpRequest;
}

interface Uploaded {
    filename: string;
    size: number;
}

enum UploadStatus {
    INIT,
    UPLOADING,
    PAUSE
}

function App() {
    let [currentFile, setCurrentFile] = useState<File>();
    let [objectURL, setObjectURL] = useState<string>('');
    let [partList, setPartList] = useState<Part[]>([]);
    let [uploadStatus, setUploadStatus] = useState<UploadStatus>(UploadStatus.INIT);
    let [hashProgress, setHashProgress] = useState<number>(0);
    let [filename, setFilename] = useState<string>("");
    let [chunkTransformed, setChunkTransformed] = useState<boolean>(false);
    let [, setFileHash] = useState<number>(0);
    useEffect(() => {
        if (currentFile) {
            let objectURL = window.URL.createObjectURL(currentFile);
            setObjectURL(objectURL);
            return () => window.URL.revokeObjectURL(objectURL);
            // const reader = new FileReader();
            // reader.addEventListener('load', () => setObjectURL(reader.result as string));
            // reader.readAsDataURL(currentFile);
        }
    }, [currentFile]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let file: File = event.target.files![0];
        setCurrentFile(file);
    }

    async function handleUpload() {
        if (!currentFile) {
            return message.error('你尚未选择文件');
        }
        if (!allowUpload(currentFile)) {
            return message.error('不支持此类文件的上传');
        }


        // 将状态设置为开始下载
        setUploadStatus(UploadStatus.UPLOADING);

        // 分块
        let partList: Part[] = createPartList(currentFile);
        setPartList(partList);
        console.log(partList);


        // 通过web-worker计算分块哈希
        let fileHash = await calculateHash(partList);
        setFileHash(fileHash);
        // 通过哈希值和拓展名拼接出文件名
        let filename: string = transformByHash(currentFile.name, fileHash);
        setFilename(filename);
        // 完善chunk内的信息
        transformParts(partList, filename);
        setChunkTransformed(true);
        console.log(filename);

        // 分片上传文件
        await uploadParts(filename, partList);
    }

    async function verify(filename: string) {
        return await request({
            url: `/verify/${filename}`
        })
    }


    // 分片上传partList
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

    /**
     * 把文件名替换为通过文件内容计算出来的哈希值
     * @param filename
     * @param fileHash
     */
    function transformByHash(filename: string, fileHash: number): string {
        let lastDotIndex = filename.lastIndexOf(".");
        let extName = filename.slice(lastDotIndex);
        return fileHash + extName;
    }

    /**
     * 通过创建一个web-worker来计算文件的哈希值，并且监控计算进度
     * @param partList
     */
    function calculateHash(partList: Part[]): Promise<number> {
        return new Promise((resolve => {
            let worker = new Worker("/worker.js");
            worker.postMessage({partList});
            worker.onmessage = function ({data}) {
                console.log(data)
                setHashProgress(data.percent);
                if (data.hash) {
                    resolve(data.hash);
                }
            }
        }))
    }

    /**
     * 把文件切割成chunk组成一个partList
     * @param currentFile
     * @param size
     */
    function createPartList(currentFile: File, size: number = DEFAULT_SIZE): Part[] {
        let List: Part[] = [],
            current = 0;
        while (current < currentFile.size) {
            let chunk: Blob = currentFile.slice(current, current + size);
            List.push({
                chunk,
                size: chunk.size
            })
            current += size;
        }

        return List;
    }

    /**
     * 判断文件是否允许上传
     * @param file
     */
    function allowUpload(file: File) {
        console.log(file)
        let isValidFileType = ["image/jpeg", "image/png", "image/gif", "video/mp4"].includes(file.type);
        if (!isValidFileType) {
            message.error('不支持此类文件上传');
        }
        //文件大小的单位是字节  1024bytes=1k*1024=1M*1024=1G*2=2G
        const isLessThan2G = file.size < 1024 * 1024 * 1024 * 2;
        if (!isLessThan2G) {
            message.error('上传的文件不能大于2G');
        }
        return isValidFileType && isLessThan2G;
    }

    function reset() {
        setUploadStatus(UploadStatus.INIT);
        setPartList([]);
        setFilename("");
        setHashProgress(0);
        setChunkTransformed(false);
    }


    function handlePause() {
        partList.forEach(part => part.xhr && part.xhr.abort());
        setUploadStatus(UploadStatus.PAUSE);
    }

    async function handleResume() {
        setUploadStatus(UploadStatus.UPLOADING);
        console.log("filename", filename);
        await uploadParts(filename, partList);
    }

    let totalProgress: number = partList.length > 0
        ? partList.reduce((acc: number, curr: Part) => {
        return acc + curr.percent!;
    }, 0) / partList.length
        : 0;

    const columns = [
        {
            title: "切片名称",
            dataIndex: "chunk_name",
            key: "chunk_name",
            width: "50%",
        },
        {
            title: "上传进度",
            dataIndex: "percent",
            key: "percent",
            width: "50%",
            render: (value: number) => {
                return (
                    <Progress
                        percent={value}
                    />
                )
            }
        }
    ]

    const uploadProgress = uploadStatus !== UploadStatus.INIT ? (
        <>
            <Row>
                <Col span={4}>
                    HASH总进度:
                </Col>
                <Col span={20}>
                    <Progress percent={hashProgress}/>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    总进度:
                </Col>
                <Col span={20}>
                    <Progress percent={totalProgress}/>
                </Col>
            </Row>
            {chunkTransformed && <Table
                columns={columns}
                dataSource={partList}
                rowKey={row => row.chunk_name!}
            />}
        </>
    ) : null;

    return (
        <>
            <div className="app">
                <Row>
                    <Col span={12}>
                        <Input type="file" onChange={handleChange}/>
                        {uploadStatus === UploadStatus.INIT &&
                        <Button type="primary" onClick={handleUpload}>点击上传</Button>}
                        {uploadStatus === UploadStatus.UPLOADING &&
                        <Button type="primary" onClick={handlePause}>暂停</Button>}
                        {uploadStatus === UploadStatus.PAUSE &&
                        <Button type="primary" onClick={handleResume}>恢复</Button>}
                    </Col>
                    <Col span={12}>
                        {objectURL && <img className="preview" alt="preview" src={objectURL}/>}
                    </Col>
                </Row>
            </div>
            {uploadProgress}
        </>
    )
}

export default App;
