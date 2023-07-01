import { isAlreadyAuth } from '@chat-app/web/shared';
import { SignIn } from '@chat-app/web/login';
const SignInPage = () => {
  return <SignIn />;
};

export const getServerSideProps = isAlreadyAuth();

export default SignInPage;
