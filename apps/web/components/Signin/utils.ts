import { clientEnvs } from '@chat-app/web/env';
import { AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const { NEXT_API_URL } = clientEnvs;

export const renderOauthButtons = [
  {
    Icon: AiOutlineGithub,
    title: 'Sign in with Github',
    onClick: () => {
      window.open(`${NEXT_API_URL}/auth/github`, '_self');
    },
  },
  {
    Icon: FcGoogle,
    title: 'Sign in with Google',
    onClick: () => {
      window.open(`${NEXT_API_URL}/auth/google`, '_self');
    },
  },
];
