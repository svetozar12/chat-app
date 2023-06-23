import { ICtx } from '@chat-app/web/utils';
import SignIn from '../components/Signin/Signin';
import { TOKEN, USER_ID } from '@chat-app/common/constants';
import { LOGIN_ROUTE } from '@chat-app/web/constants';
import { cookies } from 'next/headers';
const SignInPage = () => {
  return <SignIn />;
};

export const getServerSideProps = ({ res }: ICtx) => {
  res.setHeader('Set-Cookie', [
    `${USER_ID}=deleted; Max-Age=0`,
    `${TOKEN}=deleted; Max-Age=0`,
  ]);
  cookies().delete(USER_ID);
  cookies().delete(TOKEN);

  return {
    redirect: {
      destination: LOGIN_ROUTE,
      permanent: true,
    },
  };
};

export default SignInPage;
