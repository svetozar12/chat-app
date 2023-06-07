import React from 'react';
import { Modal } from '../Modal';
import { OauthButton } from './subcomponents/OauthButton';
import { renderOauthButtons } from './utils';

const SignIn = () => {
  const MODAL_TITLE = 'Sign in to ChatApp';

  return (
    <div className="bg-chatAppGray-100 w-full h-screen flex justify-center items-center">
      <Modal
        className="bg-black min-w-[500px]"
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
