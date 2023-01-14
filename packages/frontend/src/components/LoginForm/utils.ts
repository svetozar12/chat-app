import { IFields } from 'components/FormWrapper/FormWrapper';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from 'constants/cookieNames';
import { Cookie } from 'next-cookie';
import { NextRouter } from 'next/router';
import { LoginUserMutationVariables, LoginUserMutation, LoginUserMutationFn } from 'services/generated';
import { setAlert } from 'services/redux/reducer/alert/actions';
import { IAuth } from 'services/redux/reducer/auth/state';
import { togglelIsLoading } from 'services/redux/reducer/toggles/actions';

export const handleSubmit = async (
  values: LoginUserMutationVariables,
  auth: IAuth,
  cookie: Cookie,
  mutation: { loginUserMutation: LoginUserMutationFn },
  setters: {
    togglelIsLoadingSetter: typeof togglelIsLoading;
    setAlertSetter: typeof setAlert;
  },
) => {
  const { setAlertSetter, togglelIsLoadingSetter } = setters;
  const { loginUserMutation } = mutation;
  const rememberMe = auth.remember_me ? 31556952 : 3600;
  const refreshRememberMe = auth.remember_me ? 63113904 : 7200;
  togglelIsLoadingSetter(true);
  try {
    const { username } = values;
    const { data } = await loginUserMutation({ variables: { ...values } });
    const { loginUser } = data || {};

    if (loginUser?.__typename === 'Error') setAlertSetter(loginUser?.message, 'error');
    else if (loginUser?.__typename === 'LoginUser') {
      const { AccessToken, RefreshToken, userId } = loginUser || {};

      const cookies = [
        { name: 'name', value: username, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
        { name: USER_ID, value: userId, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
        { name: ACCESS_TOKEN, value: AccessToken, options: { sameSite: 'strict', maxAge: rememberMe, path: '/' } },
        { name: REFRESH_TOKEN, value: RefreshToken, options: { sameSite: 'strict', maxAge: refreshRememberMe, path: '/' } },
      ];

      cookies.forEach((element) => {
        const { name, value, options } = element;
        cookie.set(name, value, { ...(options as any) });
      });
    }
  } catch (error) {
    return error;
  } finally {
    togglelIsLoadingSetter(false);
  }
};

export const renderInputs = (color: string): IFields[] => {
  return [
    {
      props: {
        type: 'text',
        name: 'username',
        color,
        placeholder: 'username ...',
        boxShadow: `0px 0px 2px 0px ${color}`,
        _placeholder: { color: color, opacity: 0.5 },
      },
    },
    {
      props: {
        type: 'password',
        name: 'password',
        color,
        boxShadow: `0px 0px 2px 0px ${color}`,
        placeholder: 'password ...',
        _placeholder: { color: color, opacity: 0.5 },
      },
    },
    {
      props: {
        type: 'checkbox',
        name: 'remember_me',
        color,
      },
    },
  ];
};
