import { Cookie } from 'next-cookie';
import { NextRouter } from 'next/router';
import { LoginUserMutationVariables, LoginUserMutationFn, LoginUserMutation } from 'services/generated';
import { setAlert } from 'services/redux/reducer/alert/actions';
import { IAuth } from 'services/redux/reducer/auth/state';
import { setInputPassword, setInputUsername } from 'services/redux/reducer/inputs/actions';
import { togglelIsLoading } from 'services/redux/reducer/toggles/actions';

export const handleSubmit = async (
  values: LoginUserMutationVariables,
  auth: IAuth,
  cookie: Cookie,
  router: NextRouter,
  callback: string,
  mutation: { loginUserMutation: LoginUserMutationFn; data: LoginUserMutation | null | undefined },
  setters: {
    setInputUsernameSetter: typeof setInputUsername;
    setInputPasswordSetter: typeof setInputPassword;
    togglelIsLoadingSetter: typeof togglelIsLoading;
    setAlertSetter: typeof setAlert;
  },
  firstChatId: string,
) => {
  const { setInputUsernameSetter, setAlertSetter, setInputPasswordSetter, togglelIsLoadingSetter } = setters;
  const { data, loginUserMutation } = mutation;
  const rememberMe = auth.remember_me ? 31556952 : 3600;
  const refreshRememberMe = auth.remember_me ? 63113904 : 7200;
  togglelIsLoadingSetter(true);
  try {
    const { username } = values;
    await loginUserMutation({ variables: { ...values } });
    const { loginUser } = data || {};

    if (loginUser?.__typename === 'Error') setAlertSetter(loginUser?.message, 'error');
    else if (loginUser?.__typename === 'LoginUser') {
      const { AccessToken, RefreshToken, userId } = loginUser || {};

      const cookies = [
        { name: 'name', value: username, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
        { name: 'id', value: userId, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
        { name: 'token', value: AccessToken, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
        { name: 'refresh_token', value: RefreshToken, options: { sameSite: 'strict', maxAge: refreshRememberMe, path: '/' } },
      ];

      cookies.forEach((element) => {
        const { name, value, options } = element;
        cookie.set(name, value, { ...(options as any) });
      });

      cookie.set('REDIRECT_URL_CALLBACK', callback || `/${firstChatId}`);
      router.push(callback || `/${firstChatId}`);

      setInputUsernameSetter('');
      setInputPasswordSetter('');
    }
  } catch (error) {
    return error;
  } finally {
    togglelIsLoadingSetter(false);
  }
};
