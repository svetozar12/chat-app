import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/css";
import { useCookie } from "next-cookie";
// services
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import api_helper from "../../services/graphql/api_helper";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import { getAuth } from "../../utils/authMethods";
import { useAuth } from "../../utils/SessionProvider";
// components
import FindFriendsHeader from "./FindFriendsHeader";
import SkeletonFindFriendsHeader from "../Loading/SkeletonFindFriendsHeader";
import FindFriendsSearch from "./FindFriendsSearch";
import { Skeleton, VStack, FormControl } from "@chakra-ui/react";

function FindFriends() {
  const dispatch = useDispatch();

  const cookie = useCookie();
  const { user } = useAuth();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);

  const sendInvite = async () => {
    try {
      await getAuth();
      const res = await api_helper.invite.create(cookie.get("id"), state.reciever, cookie.get("token"));
      authState.ws?.emit("send_friend_request", {
        inviter: res.inviter,
        reciever: res.reciever,
      });

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    if (state.reciever) {
      await sendInvite();
      dispatch({ type: "SET_RECIEVER", payload: "" });
    }
  };

  return (
    <VStack
      className={css`
        width: 100%;
        margin: 0;
        padding: 1rem;
        display: flex;
        justify: flex-start;
        position: relative;
        margin-bottom: 1rem;
        align-items: center;
      `}
    >
      {user ? <FindFriendsHeader /> : <SkeletonFindFriendsHeader />}
      <FormControl>{user ? <FindFriendsSearch handleSubmit={handleSubmit} /> : <Skeleton w="95%" mt={1} h="2.6875rem" />}</FormControl>
    </VStack>
  );
}

export default React.memo(FindFriends);
