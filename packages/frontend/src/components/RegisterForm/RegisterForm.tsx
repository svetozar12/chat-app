import { connect } from 'react-redux';
// services
import { Flex, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import DefaultLink from '../../services/chat-ui/DefaultLink';
// components
import QuickLogin_Modal from './QuickLogin_Modal';
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
  quickLogin: () => Promise<void>;
  toggle: IToggle;
}
type FormValues = { username: string; password: string; email: string; gender: Gender };
const RegisterForm: FC<IRegisterForm> = ({ quickLogin, setAlert, toggle, toggleQuickLogin }) => {
  const {
    base: {
      button: { color: btnColor },
      default: { color },
    },
  } = useThemeColors();
  const [createUserMutation, { data }] = useCreateUserMutation();

  const handleSubmit = async ({ username, password, email, gender }: FormValues) => {
    await createUserMutation({ variables: { user: { username, email, password, gender } } });
    if (data?.createUser.__typename === 'Error') setAlert(data.createUser.message, 'error');
    if (data) toggleQuickLogin(false);
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
      {toggle.toggleQuickLogin && <QuickLogin_Modal quickLogin={quickLogin} />}
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
