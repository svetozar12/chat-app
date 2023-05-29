import React from 'react';
import { Modal } from '../Modal';
import { OauthButton } from './subcomponents/OauthButton';
import { AiOutlineGithub, AiOutlineGoogle } from 'react-icons/ai';
const SignIn = () => {
  const MODAL_TITLE = 'Sign in to ChatApp';
  const GITHUB_TITLE = 'Sign in with GitHub';
  const GOOGLE_TITLE = 'Sign in with Google';
  return (
    <div className="bg-chatAppGray-100 w-full h-screen flex justify-center items-center">
      <Modal
        className="bg-black min-w-[600px]"
        isOpen={true}
        title={MODAL_TITLE}
      >
        <div className="m-auto mb-5 w-[364px] flex justify-center items-center">
          <OauthButton
            Icon={AiOutlineGithub}
            onClick={() =>
              window.open(`http://localhost:3000/api/auth/github`, '_self')
            }
            title={GITHUB_TITLE}
          />
        </div>
        <div className="m-auto mb-5 w-[364px] flex justify-center items-center">
          <OauthButton
            Icon={AiOutlineGoogle}
            onClick={() =>
              window.open(`http://localhost:3000/api/auth/google`, '_self')
            }
            title={GOOGLE_TITLE}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SignIn;
