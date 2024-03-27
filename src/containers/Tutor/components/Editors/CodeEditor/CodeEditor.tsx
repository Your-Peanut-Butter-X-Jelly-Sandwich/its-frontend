import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, codeContent, handleCodeEditorChange }) => {
  return (
    <div className="flex-grow overflow-auto pl-3 pr-1">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={codeContent}
        onChange={handleCodeEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
