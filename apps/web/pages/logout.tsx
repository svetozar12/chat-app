import SignIn from '../components/Signin/Signin';
import { TOKEN, USER_ID } from '@chat-app/common/constants';
import { LOGIN_ROUTE } from '@chat-app/web/constants';
import { useCookie } from 'next-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const SignInPage = () => {
  useLogout();

  return <SignIn />;
};

function useLogout() {
  const cookies = useCookie();
  const router = useRouter();
  useEffect(() => {
    cookies.remove(TOKEN);
    cookies.remove(USER_ID);
    router.push(LOGIN_ROUTE);
  }, []);
}

export default SignInPage;
