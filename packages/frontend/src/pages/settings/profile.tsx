import React from 'react';
import { useCookie } from 'next-cookie';
// services
import { HStack } from '@chakra-ui/react';
// utils
import generic from '../../utils/generic';
import withAuthSync, { ICtx } from '../../utils/auth';
import { useAuth } from '../../utils/SessionProvider';
import { getAuth } from '../../utils/authMethods';
// components
import UpdateInfo from '../../components/UpdateInfo';
import SkelletonUserSettings from '../../components/Loading/SkelletonUserSettings';
import UpdateInfoForm from '../../components/UpdateInfo/UpdateInfoForm';
import useThemeColors from '../../hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { setInputEmail, setInputGender } from 'services/redux/reducer/inputs/actions';
import { connect } from 'react-redux';
import IInputs from 'services/redux/reducer/inputs/state';
import sdk from 'services/sdk';
import { UserModel } from '@chat-app/graphql-server';

interface IProfile {
  cookie: string;
  inputs: IInputs;
  setInputEmail: typeof setInputEmail;
  setInputGender: typeof setInputGender;
}

function Profile(props: IProfile) {
  const { inputs, setInputEmail, setInputGender } = props;
  const [image, setImage] = React.useState('');
  const cookie = useCookie(props.cookie);
  const { user } = useAuth();

  React.useEffect(() => {
    cookie.set('REDIRECT_URL_CALLBACK', window.location.pathname, { path: '/' });
  }, []);
  const {
    colors: { chatBg },
  } = useThemeColors();

  if (!user) return <SkelletonUserSettings />;

  const handleSubmit = async (e: any) => {
    try {
      getAuth();
      const formData = new FormData();
      formData.append('username', user.username);
      if (inputs.input_email) formData.append('email', inputs.input_email);
      if (inputs.input_gender) formData.append('gender', inputs.input_gender);
      if (image) formData.append('userAvatar', image);

      e.preventDefault();
      await sdk.user.updateUser({ auth: { userId: user._id, AccessToken: cookie.get('token') }, user: formData as unknown as UserModel });
      setInputEmail('');
      setInputGender('');
    } catch (error) {
      return false;
    }
  };

  return (
    <HStack w="full" h="100vh" bg={chatBg} alignItems="center" justifyContent="center">
      <UpdateInfo handleSubmit={handleSubmit}>
        <UpdateInfoForm image={image} setImage={setImage} />
      </UpdateInfo>
    </HStack>
  );
}

export const getServerSideProps = withAuthSync(async (ctx: ICtx) => {
  const cookie = useCookie(ctx);
  const chatInstance: any = await generic.getFirstChat(cookie.get('id'), cookie.get('token'));
  cookie.set('first_chat_id', chatInstance, {
    sameSite: 'strict',
    path: '/',
  });
  cookie.set('last_visited_chatRoom', chatInstance, {
    sameSite: 'strict',
    path: '/',
  });
  return { props: {} };
});

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setInputEmail: bindActionCreators(setInputEmail, dispatch),
  setInputGender: bindActionCreators(setInputGender, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
