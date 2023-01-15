import { connect } from 'react-redux';
// services
import { Flex, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import DefaultLink from '../../services/chat-ui/DefaultLink';
// components
import QuickLogin from './QuickLogin';
import FormWrapper from 'components/FormWrapper';
import useThemeColors from '../../hooks/useThemeColors';
import { toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { IToggle } from 'services/redux/reducer/toggles/state';
import { Gender, useCreateUserMutation } from 'services/generated';
import { setAlert } from 'services/redux/reducer/alert/actions';
import { renderInputs } from 'components/RegisterForm/utils';

interface IRegisterForm extends ReturnType<typeof mapDispatchToProps> {
  toggle: IToggle;
}
type FormValues = { username: string; password: string; email: string; gender: Gender };
const RegisterForm: FC<IRegisterForm> = ({ setAlert, toggle, toggleQuickLogin }) => {
  const {
    base: {
      button: { color: btnColor },
      default: { color },
    },
  } = useThemeColors();
  const [createUserMutation, { data }] = useCreateUserMutation();
  const { createUser } = data || {};
  if (createUser?.__typename === 'Error') {
    setAlert(createUser.message, 'error');
    return <></>;
  }

  const handleSubmit = async ({ username, password, email, gender }: FormValues) => {
    if (!username || !password || !email || !gender) return;
    await createUserMutation({ variables: { user: { username, email, password, gender } } });
    const { createUser } = data || {};
    if (createUser?.__typename === 'Error') setAlert(createUser.message, 'error');
    else {
      setAlert('User created', 'success');
      toggleQuickLogin(true);
    }
  };

  return (
    <>
      <FormWrapper
        onSubmit={handleSubmit}
        header={
          <Flex w="full" justifyContent="center" gap={2} mb="2" flexDir="column">
            <Heading>Register</Heading>
            <DefaultLink href="/" text="Already have an account?" />
          </Flex>
        }
        fields={renderInputs(color)}
        buttons={[{ value: 'Register', props: { colorScheme: btnColor, w: '30%', type: 'submit' } }]}
      />
      {toggle.toggleQuickLogin && (
        <QuickLogin
          UserId={createUser?.userId as string}
          AccessToken={createUser?.AccessToken as string}
          RefreshToken={createUser?.RefreshToken as string}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
  setAlert: bindActionCreators(setAlert, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
