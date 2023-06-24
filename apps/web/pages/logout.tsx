import { ICtx } from '@chat-app/web/utils';
import SignIn from '../components/Signin/Signin';
import { TOKEN, USER_ID } from '@chat-app/common/constants';
import { LOGIN_ROUTE } from '@chat-app/web/constants';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';

const SignInPage = () => {
  return <SignIn />;
};

export const getServerSideProps = ({ res }: ICtx) => {
  const deletedCookieOptions: Record<string, any> = {
    maxAge: 0,
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    domain:
      process.env.NODE_ENV === 'development' ? 'localhost' : 'gospodinovs.com',
  };
  res.setHeader('Set-Cookie', [
    serialize(TOKEN, '', { ...deletedCookieOptions }),
    serialize(USER_ID, '', { ...deletedCookieOptions }),
  ]);

  return {
    redirect: {
      destination: LOGIN_ROUTE,
      permanent: true,
    },
  };
};

export default SignInPage;
