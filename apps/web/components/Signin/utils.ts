import { AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export const renderOauthButtons = [
  {
    Icon: AiOutlineGithub,
    title: 'Sign in with Github',
    onClick: () => {
      window.open(`http://localhost:3000/api/auth/github`, '_self');
    },
  },
  {
    Icon: FcGoogle,
    title: 'Sign in with Google',
    onClick: () => {
      window.open(`http://localhost:3000/api/auth/google`, '_self');
    },
  },
];
