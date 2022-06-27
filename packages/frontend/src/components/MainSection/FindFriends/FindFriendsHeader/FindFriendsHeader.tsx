import { css } from "@emotion/css";
import React from "react";
import UserSettings from "./UserSettings";
// icons
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
// services
import s from "./FindFriendsHeader.module.css";
import ISave_inputState from "services/redux/reducer/save_inputReducer/state";
import { IInitialSet } from "services/redux/reducer/setReducer/state";
import api_helper from "services/graphql/api_helper";
// hooks
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from "next-cookie";
import { Center, Circle, Divider, Flex, Heading, HStack, Spacer, Image } from "@chakra-ui/react";

const FindFriendsHeader = () => {
  const dispatch = useDispatch();
  const cookie = useCookie();
  const user_id = cookie.get("id") as string;
  const token = cookie.get("token") as string;

  const [image, setImage] = React.useState("");
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const notifState = useSelector((state: { saveInputReducer: ISave_inputState }) => state.saveInputReducer);

  const getUserImage = async () => {
    try {
      const res = await api_helper.user.getById(user_id, token);
      const userAvatar = res.userAvatar;

      setImage(userAvatar);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getUserImage();
  }, []);

  const toggleGroupCreate = () => {
    dispatch({
      type: "TOGGLE_CREATE_GROUP",
      payload: !state.toggleCreateGroup,
    });
    dispatch({
      type: "SET_MOBILE_NAV",
      payload: !state.setMobileNav,
    });
    dispatch({
      type: "SET_CHAT_SETTINGS",
      payload: false,
    });
  };

  return (
    <>
      <div
        className={css`
          width: 95%;
          height: 3rem;
          margin-bottom: 1rem;
          position: relative;
        `}
      ></div>
      <HStack w="99%" minW="300px" pb="1rem">
        <Flex align="center">
          <Image
            alt="user_avatar"
            src={image}
            w="5rem"
            h="5rem"
            mr="1rem"
            borderRadius="full"
            pos="relative"
            zIndex={10}
            color="var(--main-logo-color)"
          />
          <Heading size="md" whiteSpace="nowrap">
            Chats
          </Heading>
        </Flex>
        <Spacer />
        <HStack gap={{ base: 0, md: 5 }}>
          <Center
            pos="relative"
            className={s.icon_parrent}
            onClick={() => {
              dispatch({
                type: "SET_FRIEND_REQUEST",
                payload: !state.setFriendRequest,
              });
            }}
          >
            <IoNotifications className={s.icon} />
            {notifState.notification_number > 0 && (
              <Circle
                display="flex"
                justifyContent="center"
                alignItems="center"
                pos="absolute"
                right={0}
                top={0}
                bg="red"
                borderRadius="full"
                size="1.2rem"
                m={2}
                fontWeight="semibold"
                color="white"
              >
                {notifState.notification_number}
              </Circle>
            )}
          </Center>
          <Center className={s.icon_parrent} onClick={toggleGroupCreate}>
            <AiOutlineUsergroupAdd className={s.icon} />
          </Center>
          <Center
            className={s.icon_parrent}
            pos="relative"
            onClick={() =>
              dispatch({
                type: "SET_USER_SETTINGS",
                payload: !state.setUserSettings,
              })
            }
          >
            <BsThreeDots className={s.icon} />
            {state.setUserSettings ? <UserSettings /> : null}
          </Center>
        </HStack>
      </HStack>
      <Divider />
    </>
  );
};

export default React.memo(FindFriendsHeader);
