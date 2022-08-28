import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import RegisterForm from 'components/RegisterForm';
import apiHelper from 'services/graphql/apiHelper';
import generic from 'utils/generic';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { togglelIsLoading, toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import { setInputEmail, setInputGender, setInputPassword, setInputUsername } from 'services/redux/reducer/inputs/actions';
import { connect } from 'react-redux';
import IInputs from 'services/redux/reducer/inputs/state';

interface IRegisterLayout {
  inputs: IInputs;
  toggleQuickLogin: typeof toggleQuickLogin;
  setInputEmail: typeof setInputEmail;
  setInputGender: typeof setInputGender;
  setInputPassword: typeof setInputPassword;
  setInputUsername: typeof setInputUsername;
  togglelIsLoading: typeof togglelIsLoading;
}

function RegisterLayout(props: IRegisterLayout) {
  const { inputs, setInputEmail, setInputGender, setInputPassword, togglelIsLoading, setInputUsername, toggleQuickLogin } = props;
  const router = useRouter();
  const cookie = useCookie();

  const quickLogin = async () => {
    try {
      const res = await apiHelper.auth.login(inputs.input_username, inputs.input_password);
      if (res) {
        toggleQuickLogin(true);
        togglelIsLoading(true);

        const cookies = [
          { name: 'name', value: inputs.input_username, options: { sameSite: 'strict', path: '/' } },
          { name: 'id', value: res.user_id, options: { sameSite: 'strict', path: '/' } },
          { name: 'token', value: res.Access_token, options: { sameSite: 'strict', path: '/' } },
          { name: 'refresh_token', value: res.Refresh_token, options: { sameSite: 'strict', path: '/' } },
        ];

        cookies.forEach((element) => {
          const { name, value, options } = element;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          cookie.set(name, value, { ...options });
        });

        const chatInstance: string = await generic.getFirstChat(cookie.get('id'), cookie.get('token'));

        router.push(`/${chatInstance}`);
        setInputUsername('');
        setInputEmail('');
        setInputPassword('');
        setInputGender('');
        return true;
      }
      return false;
    } catch (error) {
      togglelIsLoading(false);
      console.log(error);
      return false;
    }
  };

  return <RegisterForm quickLogin={quickLogin} />;
}

const mapStateToProps = (state: STATE) => ({
  inputs: state.inputs,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleQuickLogin: bindActionCreators(toggleQuickLogin, dispatch),
  setInputUsername: bindActionCreators(setInputUsername, dispatch),
  setInputPassword: bindActionCreators(setInputPassword, dispatch),
  setInputEmail: bindActionCreators(setInputEmail, dispatch),
  setInputGender: bindActionCreators(setInputGender, dispatch),
  togglelIsLoading: bindActionCreators(togglelIsLoading, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLayout);
