'use client';
import React from 'react';
import { AvatarGenerator } from 'random-avatar-generator';
import { Avatar, Button, ConfigProvider, Divider, Input } from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useAuthUpdatePersonalInfoMutation } from '@/redux/apis/auth';
import { useAppSelector } from '@/redux';
import { RootState } from '@/redux';
type EditorType = {
  state: string;
  curState: string;
  setCurState: (arg: string) => void;
  updateState: () => void;
  isEditing: boolean;
  setIsEditing: (arg: boolean) => void;
};
const Editor: React.FC<EditorType> = ({
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
type ButtonMailtoType = {
  mailto: string;
  label: string;
};
const ButtonMailto: React.FC<ButtonMailtoType> = ({ mailto, label }: ButtonMailtoType) => {
  return (
    <a
      className="font-medium text-blue-600 cursor-pointer"
      onClick={(e) => {
        window.location.href = `mailto:${mailto}`;
        e.preventDefault();
      }}
    >
      {label}
    </a>
  );
};

type PersonalInfoType = {
  tutors: IUser[];
};
const PersonalInfo: React.FC<PersonalInfoType> = ({ tutors }: PersonalInfoType) => {
  const { email, username, organisation } = useAppSelector((state: RootState) => state.auth.user);
  const generator = new AvatarGenerator();
  const avatarLink = generator.generateRandomAvatar(email);
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [isEditingOrganisation, setIsEditingOrganisation] = useState<boolean>(false);
  const [curUsername, setCurUsername] = useState<string>('');
  const [curOrganisation, setCurOrganisation] = useState<string>('');
  const [updatePersonalInfo] = useAuthUpdatePersonalInfoMutation();

  const updateUsername = async () => {
    await updatePersonalInfo({ username: curUsername }).unwrap();
    setCurUsername('');
  };

  const updateOrganisation = async () => {
    await updatePersonalInfo({ organisation: curOrganisation }).unwrap();
    setCurOrganisation('');
  };

  return (
    <div className="bg-white p-5 rounded-md shadow-md h-full">
      <div className="flex flex-col">
        <div className="flex flex-row gap-5 align-center">
          <Avatar src={avatarLink} size={80} />
          <div className="flex flex-col justify-around">
            <div className="font-semibold">
              <Editor
                state={username}
                curState={curUsername}
                setCurState={setCurUsername}
                isEditing={isEditingUsername}
                setIsEditing={setIsEditingUsername}
                updateState={updateUsername}
              />
            </div>
            <div className="text-gray-700">
              <Editor
                state={organisation}
                curState={curOrganisation}
                setCurState={setCurOrganisation}
                isEditing={isEditingOrganisation}
                setIsEditing={setIsEditingOrganisation}
                updateState={updateOrganisation}
              />
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-5">
          <div className="font-bold text-lg">Tutors List</div>
          <div className="flex flex-col gap-3">
            {tutors.map((tutor) => {
              return (
                <div className="flex gap-2">
                  {/* <div className="font-medium text-blue-600 cursor-pointer">{tutor.email}</div> */}
                  <ButtonMailto mailto={tutor.email} label={tutor.email} />
                  <div className="font-medium">
                    {tutor.username || tutor.email.split('@')[0] || 'unknown'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
