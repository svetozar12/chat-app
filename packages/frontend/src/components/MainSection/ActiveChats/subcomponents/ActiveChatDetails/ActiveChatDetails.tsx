import { Avatar, AvatarGroup, Heading, HStack, IconButton, VStack } from '@chakra-ui/react';
import useProvideAuth from 'hooks/useSession';
import { FC } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useGetUserListQuery } from 'services/generated';
import useThemeColors from 'hooks/useThemeColors';
import { STATE } from 'services/redux/reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { toggleChatSettings } from 'services/redux/reducer/toggles/actions';
import { connect } from 'react-redux';
import s from './ActiveChatDetails.module.css';

interface IActiveChatDetails extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  _id: string;
  chatId: string;
  members: string[];
}

const ActiveChatDetails: FC<IActiveChatDetails> = ({ members, _id, chatId, toggle, toggleChatSettings }) => {
  const { users } = useGetUsers(members);
  const {
    base: {
      default: { color },
    },
  } = useThemeColors();
  return (
    <div className={s.container}>
      <HStack>
        <VStack align="flex-start">
          <div className={s.avatarContainer}>
            <AvatarGroup size="md" max={2}>
              {users?.map(({ _id, userAvatar, username }) => {
                return (
                  <HStack key={_id} alignItems="center" justifyContent="center">
                    <Avatar background="white" name={username} src={userAvatar} />
                    <Heading color={color}>{username}</Heading>
                  </HStack>
                );
              })}
            </AvatarGroup>
          </div>
          <p style={{ color }} className={s.lastMessage}>
            Last message...
          </p>
        </VStack>
      </HStack>
      {_id === chatId && (
        <IconButton
          borderRadius="full"
          aria-label=""
          icon={
            <BsThreeDots
              style={{ color, boxShadow: `0px 0px 2px 0px ${color}` }}
              className={s.activeChatSettingsBtn}
              onClick={() => toggleChatSettings(!toggle.toggleChatSettings)}
            />
          }
        />
      )}
    </div>
  );
};

const useGetUsers = (members: string[]) => {
  const { auth } = useProvideAuth();
  const { data } = useGetUserListQuery({ variables: { auth, userIds: members } });
  const { getUserList } = data || {};
  if (getUserList?.__typename === 'Error') throw new Error(getUserList.message);
  const { res: users } = getUserList || {};
  return { users };
};

const mapStateToProps = (state: STATE) => ({
  toggle: state.toggle,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleChatSettings: bindActionCreators(toggleChatSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChatDetails);
