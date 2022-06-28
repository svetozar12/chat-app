import { Box, Flex, HStack, Input, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IInitialSet } from "services/redux/reducer/setReducer/state";
import generic from "utils/generic";

interface IFindFriendsSearch {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => Promise<void>;
}

const FindFriendsSearch = ({ handleSubmit }: IFindFriendsSearch) => {
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);

  const chat_bg = useColorModeValue("main_white", "main_black");
  const from_bg = useColorModeValue("white", "#3F3D3C");
  const color = useColorModeValue("#B1BAC5", "white");

  return (
    <Flex w="100%" justifyContent="center" pos="relative">
      <HStack w="95%" h="3rem" borderRadius="25px" my="1rem" p="0.3rem" bg="rgba(122, 122, 122, 0.1)" _focusWithin={{ boxShadow: "md" }}>
        <Box p="0.8rem">
          <BsSearch style={{ cursor: "pointer", color }} />
        </Box>
        <Input
          _placeholder={{
            color,
          }}
          variant="unstyled"
          w="90%"
          my="1rem"
          onKeyPress={(e) => generic.handleSubmitOnEnter(e, handleSubmit)}
          onChange={(e) => dispatch({ type: "SET_RECIEVER", payload: e.target.value })}
          placeholder="Search for chats..."
          value={state.reciever}
          type="search"
        />
      </HStack>
    </Flex>
  );
};

export default FindFriendsSearch;
