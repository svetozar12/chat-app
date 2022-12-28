import { useCookie } from 'next-cookie';
import { useRouter } from 'next/router';
import RegisterForm from 'components/RegisterForm';
import generic from 'utils/generic';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { togglelIsLoading, toggleQuickLogin } from 'services/redux/reducer/toggles/actions';
import { setInputEmail, setInputGender, setInputPassword, setInputUsername } from 'services/redux/reducer/inputs/actions';
import { connect } from 'react-redux';
import IInputs from 'services/redux/reducer/inputs/state';
import { useLoginUserMutation } from 'services/generated';

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
  const [login, { data }] = useLoginUserMutation();
  const quickLogin = async () => {
    try {
      await login({ variables: { username: inputs.input_username, password: inputs.input_password } });
      if (data) {
        const {
          loginUser: { userId, AccessToken, RefreshToken },
        } = data;
        toggleQuickLogin(true);
        togglelIsLoading(true);
        const cookies = [
          { name: 'name', value: inputs.input_username, options: { sameSite: 'strict', path: '/' } },
          { name: 'id', value: userId, options: { sameSite: 'strict', path: '/' } },
          { name: 'token', value: AccessToken, options: { sameSite: 'strict', path: '/' } },
          { name: 'refresh_token', loginUser: RefreshToken, options: { sameSite: 'strict', path: '/' } },
        ];

        cookies.forEach((element) => {
          const { name, value, options } = element;
          cookie.set(name, value, { ...(options as any) });
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
