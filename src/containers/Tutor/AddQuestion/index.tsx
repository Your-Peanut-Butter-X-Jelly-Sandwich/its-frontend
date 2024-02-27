"use client"

import React, { useState } from 'react';
import { Button, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { RcFile } from 'antd/lib/upload';

const AddQuestionContainer: React.FC = () => {
  const [markdown, setMarkdown] = useState('');

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    setMarkdown(text);
  };

  const handleFileUpload = (file: RcFile) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setMarkdown(content);
      }
    };
    fileReader.readAsText(file);
    return false;
  };

  const publishQuestion = () => {
    console.log(markdown);
    message.success('Question published successfully!');
  };

  return (
    <div>
      <MdEditor
        value={markdown}
        style={{ height: '500px' }}
        renderHTML={(text) => <ReactMarkdown children={text} />}
        onChange={handleEditorChange}
      />
      <div style={{ marginTop: '20px' }}>
        <Upload beforeUpload={handleFileUpload} showUploadList={false}>
          <Button icon={<UploadOutlined />}>Upload Markdown/LaTeX File</Button>
        </Upload>
        <Button type="primary" onClick={publishQuestion} style={{ marginLeft: '10px' }}>
          Publish
        </Button>
      </div>
    </div>
  );
};

export default AddQuestionContainer;
