import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor: React.FC<ITutorCodeEditorProps> = ({
  language,
  codeContent,
  handleCodeEditorChange,
}) => {
  return (
    <div className="flex-grow overflow-auto pl-3 pr-1">
      <Editor
        height="100%"
        language={language}
        theme="light"
        value={codeContent}
        onChange={(newValue, e) => handleCodeEditorChange(newValue || '')}
      />
    </div>
  );
};

export default CodeEditor;
