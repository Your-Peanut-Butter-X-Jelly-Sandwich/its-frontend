"use client"

import React, { useState } from 'react';
import { Button, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';

const AddQuestionContainer = () => {
  const [markdown, setMarkdown] = useState('');

  const handleEditorChange = (newMarkdown:any) => {
    setMarkdown(newMarkdown);
  };

  const handleMarkdownFileUpload = (file:any) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setMarkdown(content);
      }
    };
    fileReader.readAsText(file);
    return false; // Prevent default upload behavior
  };

  const handleCodeFileUpload = (file:any) => {
    console.log('Reference code file uploaded:', file.name);
    message.success(`Reference code file '${file.name}' uploaded successfully!`);
    return false; // Prevent default upload behavior
  };

  const publishQuestion = () => {
    console.log(markdown);
    message.success('Question published successfully!');
  };

  const buttonStyle = {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
  };

  return (
    <div style={{ height: '96vh', width: '100vw', backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <MDEditor
          value={markdown}
          onChange={handleEditorChange}
          height= '100%' 
        />
      </div>
      <Space style={{ marginTop: '20px', padding: '10px' }}>
        <Upload beforeUpload={handleMarkdownFileUpload} showUploadList={false}>
          <Button style={buttonStyle} icon={<UploadOutlined />}>Upload Markdown File</Button>
        </Upload>
        <Upload beforeUpload={handleCodeFileUpload} showUploadList={false}>
          <Button style={buttonStyle} icon={<UploadOutlined />}>Upload Reference Code</Button>
        </Upload>
        <Button type="primary" style={buttonStyle} onClick={publishQuestion}>
          Publish
        </Button>
      </Space>
    </div>
  );
};

export default AddQuestionContainer;