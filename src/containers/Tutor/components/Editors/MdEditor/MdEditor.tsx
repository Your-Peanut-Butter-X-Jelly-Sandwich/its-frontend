import React from 'react';
import MdEditor from '@uiw/react-md-editor';

const MdEditorTabs:React.FC<ITutorMdEditorProps> = ({ currentLeftTab, setCurrentLeftTab, markdown, handleEditorChange }) => {
  return (
    <div className="w-1/2 flex flex-col">
      <div className="flex mb-4">
        <div
          className={`cursor-pointer p-2 ${currentLeftTab === 'edit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setCurrentLeftTab('edit')}
        >
          Edit
        </div>
        <div
          className={`cursor-pointer p-2 ${currentLeftTab === 'preview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setCurrentLeftTab('preview')}
        >
          Preview
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <MdEditor
          value={markdown}
          onChange={(newValue, e) => handleEditorChange(newValue || '')}
          // onChange={handleEditorChange}
          preview={currentLeftTab}
          height="100%"
        />
      </div>
    </div>
  );
};

export default MdEditorTabs;
