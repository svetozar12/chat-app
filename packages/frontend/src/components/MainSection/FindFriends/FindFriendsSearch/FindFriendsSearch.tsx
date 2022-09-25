import { Box, Flex, HStack, Input } from '@chakra-ui/react';

import useThemeColors from 'hooks/useThemeColors';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { STATE } from 'services/redux/reducer';
import { setReciever } from 'services/redux/reducer/invites/actions';
import IInvite from 'services/redux/reducer/invites/state';
import generic from 'utils/generic';

interface IFindFriendsSearch {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => Promise<void>;
  setReciever: typeof setReciever;
  invite: IInvite;
}

function FindFriendsSearch(props: IFindFriendsSearch) {
  const { handleSubmit, invite, setReciever } = props;
  const {
    base: {
      default: { color },
    },
  } = useThemeColors();

  return (
    <Flex w="100%" justifyContent="center" pos="relative">
      <HStack w="95%" h="3rem" borderRadius="25px" my="1rem" p="0.3rem" bg="rgba(122, 122, 122, 0.1)" _focusWithin={{ boxShadow: 'md' }}>
        <Box p="0.8rem">
          <BsSearch style={{ cursor: 'pointer', color }} />
        </Box>
        <Input
          _placeholder={{
            color,
          }}
          variant="unstyled"
          w="90%"
          my="1rem"
          onKeyPress={(e) => generic.handleSubmitOnEnter(e, handleSubmit)}
          onChange={(e) => setReciever(e.target.value)}
          placeholder="Search for chats..."
          value={invite.reciever}
          type="search"
        />
      </HStack>
    </Flex>
  );
}

const mapStateToProps = (state: STATE) => ({
  invite: state.invite,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setReciever: bindActionCreators(setReciever, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FindFriendsSearch);
