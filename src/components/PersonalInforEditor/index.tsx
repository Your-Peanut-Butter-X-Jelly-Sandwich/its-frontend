import { Button, ConfigProvider, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

type EditorPropsType = {
  state: string;
  curState: string;
  setCurState: (arg: string) => void;
  updateState: () => void;
  isEditing: boolean;
  setIsEditing: (arg: boolean) => void;
};
const PersonalInfoEditor: React.FC<EditorPropsType> = ({
  state,
  curState,
  setCurState,
  updateState,
  isEditing,
  setIsEditing,
}) => {
  return (
    <>
      {isEditing ? (
        <div className="flex gap-2">
          <Input
            placeholder={state}
            className="border-t-0 border-l-0 border-r-0 rounded-none focus:shadow-none pl-1"
            value={curState}
            onChange={(e) => setCurState(e.currentTarget.value)}
          />
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBg: 'rgb(22, 163, 74)',
                  defaultHoverColor: 'white',
                },
              },
            }}
          >
            <Button
              className="bg-green-600 text-white border-none"
              disabled={curState == ''}
              onClick={() => {
                updateState();
                setIsEditing(false);
              }}
            >
              OK
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBg: 'rgb(220, 38, 38)',
                  defaultHoverColor: 'white',
                },
              },
            }}
          >
            <Button
              className="bg-red-600 text-white border-none hover:bg-red-600 hover:text-white"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </ConfigProvider>
        </div>
      ) : (
        <div className="flex flex-row text-lg gap-2">
          <div>{state}</div>
          <div className="cursor-pointer hover:text-cyan-600" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalInfoEditor;
