import { isAlreadyAuth } from '@chat-app/web/utils';
import SignIn from '../components/Signin/Signin';
import { setPublicConfig } from '../util';
import { useEffect } from 'react';
const SignInPage = (props) => {
  useEffect(() => {
    setPublicConfig(props.publicEnvs);
  }, []);
  return <SignIn />;
};

export const getServerSideProps = isAlreadyAuth(() => {
  const allowedEnvs = [
    'NEXT_PUBLIC_WS_SERVER_URL',
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_OAUTH_METHODS',
  ];
  const config = {};
  for (const env of allowedEnvs) {
    config[env] = process.env[env];
  }

  return { props: { publicEnvs: config } };
});

export default SignInPage;
