import React from 'react';
import { Modal } from '@chat-app/web/ui';
import { OauthButton } from './subcomponents/OauthButton';
import { AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { WEB_ENVS } from '@chat-app/web/shared';

const {
  NEXT_PUBLIC_API_HOST,
  NEXT_PUBLIC_API_PORT,
  NEXT_PUBLIC_API_SCHEME,
  NEXT_PUBLIC_OAUTH_METHODS,
} = WEB_ENVS;
const SignIn = () => {
  const BASE_URL = `${NEXT_PUBLIC_API_SCHEME}://${NEXT_PUBLIC_API_HOST}:${NEXT_PUBLIC_API_PORT}`;
  const MODAL_TITLE = 'Sign in to ChatApp';
  const renderOauthButtons = [
    {
      name: 'github',
      Icon: AiOutlineGithub,
      title: 'Sign in with Github',
      onClick: async () => {
        window.open(`${BASE_URL}/api/auth/github`, '_self');
      },
    },
    {
      name: 'google',
      Icon: FcGoogle,
      title: 'Sign in with Google',
      onClick: () => {
        window.open(`${BASE_URL}/api/auth/google`, '_self');
      },
    },
  ].filter(({ name }) => NEXT_PUBLIC_OAUTH_METHODS.includes(name));

  return (
    <div className="bg-gray-primary w-full h-screen flex justify-center items-center">
      <Modal
        className="bg-black bg-opacity-30 min-w-[300px] lg:min-w-[500px]"
        isOpen={true}
        title={MODAL_TITLE}
      >
        {renderOauthButtons.map((button) => {
          return (
            <div
              key={button.title}
              className="m-auto mb-5 w-[364px] flex justify-center items-center"
            >
              <OauthButton {...button} />
            </div>
          );
        })}
      </Modal>
    </div>
  );
};

export default SignIn;
