import { isAlreadyAuth } from '@chat-app/web/utils';
import SignIn from '../components/Signin/Signin';
const SignInPage = () => {
  console.log('SIGN IN');
  return <SignIn />;
};

export const getServerSideProps = isAlreadyAuth();

export default SignInPage;
