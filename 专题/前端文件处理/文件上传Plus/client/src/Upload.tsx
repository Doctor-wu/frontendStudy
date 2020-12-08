import React, {ChangeEvent, useEffect, useState} from 'react';
import {Row, Col, Input, Button, message} from "antd";
import {request} from "./utils";

function App() {
    let [currentFile, setCurrentFile] = useState<File>();
    let [objectURL, setObjectURL] = useState<string>('');
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

        let form = new FormData();
        form.append("filename", currentFile.name);
        form.append("chunk", currentFile);

        let res = await request({
            method: "POST",
            data: form,
            url: "/upload"
        });
        res.success && message.success("上传成功!");
    }

    function allowUpload(file: File) {
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

    return (
        <div className="app">
            <Row>
                <Col span={12}>
                    <Input type="file" onChange={handleChange}/>
                    <Button type="primary" onClick={handleUpload}>点击上传</Button>
                </Col>
                <Col span={12}>
                    {objectURL && <img className="preview" alt="preview" src={objectURL}/>}
                </Col>
            </Row>
        </div>
    )
}

export default App;
