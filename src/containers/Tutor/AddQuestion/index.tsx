"use client"

import React, { useState } from 'react';
import { Button, Upload, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';

const AddQuestionContainer = () => {
  const [markdown, setMarkdown] = useState('');

  const handleEditorChange = (newMarkdown) => {
    setMarkdown(newMarkdown);
  };

  const handleFileUpload = (file) => {
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

  const publishQuestion = () => {
    console.log(markdown);
    message.success('Question published successfully!');
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <MDEditor
          value={markdown}
          onChange={handleEditorChange}
          height={500}
        />
      </div>
      <Space style={{ marginTop: '20px' }}>
        <Upload beforeUpload={handleFileUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload Markdown File</Button>
        </Upload>
        <Button type="primary" onClick={publishQuestion}>
          Publish
        </Button>
      </Space>
    </div>
  );
};

export default AddQuestionContainer;
