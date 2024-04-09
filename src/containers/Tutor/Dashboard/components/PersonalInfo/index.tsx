'use client';
import React from 'react';
import { Divider } from 'antd';
import CustomAvatar from '@/components/Avatar';
import { useState } from 'react';
import { useAuthUpdatePersonalInfoMutation } from '@/redux/apis/auth';
import { useAppSelector } from '@/redux';
import { RootState } from '@/redux';
import PersonalInfoEditor from '@/components/PersonalInforEditor';

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
  students: IUser[];
};
const PersonalInfo: React.FC<PersonalInfoType> = ({ students }: PersonalInfoType) => {
  const { email, username, organisation } = useAppSelector((state: RootState) => state.auth.user);
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
          <CustomAvatar email={email} size={80} />
          <div className="flex flex-col justify-around">
            <div className="font-semibold">
              <PersonalInfoEditor
                state={username}
                curState={curUsername}
                setCurState={setCurUsername}
                isEditing={isEditingUsername}
                setIsEditing={setIsEditingUsername}
                updateState={updateUsername}
              />
            </div>
            <div className="text-gray-700">
              <PersonalInfoEditor
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
          <div className="font-bold text-lg">Student List</div>
          <div className="flex flex-col gap-3">
            {students.map((student) => {
              return (
                <div key={student.email} className="flex gap-2">
                  <ButtonMailto mailto={student.email} label={student.email} />
                  <div className="font-medium">
                    {student.username || student.email.split('@')[0] || 'unknown'}
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
