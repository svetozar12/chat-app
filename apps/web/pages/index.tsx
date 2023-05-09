import { isAlreadyAuth } from '@chat-app/web/utils';
import SignIn from '../components/Signin/Signin';

function SignInPage() {
  return <SignIn />;
}

export const getServerSideProps = isAlreadyAuth();

export default SignInPage;
