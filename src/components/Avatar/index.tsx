import { AvatarGenerator } from 'random-avatar-generator';
import { Avatar } from 'antd';

type AvatarPropsType = {
  email: string;
  size: number;
};
const CustomAvatar: React.FC<AvatarPropsType> = ({ email, size }: AvatarPropsType) => {
  const generator = new AvatarGenerator();
  const avatarLink = generator.generateRandomAvatar(email);
  return <Avatar src={avatarLink} size={80} />;
};

export default CustomAvatar;
