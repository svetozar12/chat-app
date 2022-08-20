import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookie } from 'next-cookie';
// services
import { HStack } from '@chakra-ui/react';
import ISave_inputState from '../../services/redux/reducer/save_inputReducer/state';
import apiHelper from '../../services/graphql/apiHelper';
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

function Profile(props: { cookie: string }) {
  const [image, setImage] = React.useState('');
  const cookie = useCookie(props.cookie);
  const dispatch = useDispatch();
  const state = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);
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
      if (state.input_email) formData.append('email', state.input_email);
      if (state.input_gender) formData.append('gender', state.input_gender);
      if (image) formData.append('userAvatar', image);

      e.preventDefault();
      await apiHelper.user.update(user._id, cookie.get('token'), formData as any);
      dispatch({ type: 'SAVE_INPUT_EMAIL', payload: '' });
      dispatch({ type: 'SAVE_INPUT_GENDER', payload: '' });
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

export default Profile;
