import { commonEnvs } from '@chat-app/web/env';
import { getEnv } from 'apps/web/util';
import { AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

export const renderOauthButtons = [
  {
    Icon: AiOutlineGithub,
    title: 'Sign in with Github',
    onClick: () => {
      window.open(`${getEnv('API_URL')}/auth/github`, '_self');
    },
  },
  {
    Icon: FcGoogle,
    title: 'Sign in with Google',
    onClick: () => {
      window.open(`${getEnv('API_URL')}/auth/google`, '_self');
    },
  },
];
