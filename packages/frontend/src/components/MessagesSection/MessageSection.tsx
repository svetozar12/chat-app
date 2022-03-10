import React from "react";
import ChatRoom from "../ChatRoom";
import Notifications_Modal from "../Notifications_Modal";
import AddUsers_Modal from "../AddUsers_Modal";
import { css, cx } from "@emotion/css";
import { useSelector } from "react-redux";
import { InitialState2 } from "../../redux/state";
import axios from "axios";
import { useRouter } from "next/router";

const MessageSection = ({ contacts, socketRef, setLocalStatus, cookie, fetchInviteStatus, fetchInviterStatus, chatId }) => {
  const [users, setUsers] = React.useState<any[]>([]);
  const state = useSelector((state: { setReducer: InitialState2 }) => state.setReducer);
  const route = useRouter();
  const getMembersSuggestions = async () => {
    try {
      const res = await fetchInviteStatus();
      const res_inviter = await fetchInviterStatus();
      const res_chat = await axios.get(`http://localhost:4002/chat-room${window.location.pathname}`);
      const members_in_chat = res_chat.data.Message[0].members;

      let data: any[] = [];
      if (res_inviter) data = [...res_inviter];
      if (res) data = [...data, ...res];
      const usersArr: string[] = [];
      data.forEach((element) => {
        usersArr.push(element.inviter);
        usersArr.push(element.reciever);
      });
      let uniqueUsers: string[] = [];
      usersArr.forEach((element) => {
        if (!uniqueUsers.includes(element)) {
          uniqueUsers.push(element);
        }
      });
      uniqueUsers = uniqueUsers.filter((element) => !members_in_chat.includes(element));
      setUsers(uniqueUsers);
      return true;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    getMembersSuggestions();
  }, []);

  React.useEffect(() => {
    getMembersSuggestions();
  }, [route.asPath]);

  return (
    <section
      className={cx(
        "flex",
        css`
          width: 75%;
          @media (max-width: 1008px) {
            width: 100%;
          },`,
      )}
    >
      <div
        className={cx(
          css`
            width: 100%;
            height: 90vh;
            justify-content: center;
            alignitems: center;
            padding: 0;
          `,
          "container",
        )}
      >
        <div
          className={cx(
            "flex",
            css`
              width: 100%;
              height: 100vh;
            `,
          )}
        >
          {state.setFriendRequest && <Notifications_Modal contacts={contacts} socketRef={socketRef} setLocalStatus={setLocalStatus} />}

          {state.setModalInvite && socketRef && (
            <AddUsers_Modal setLocalStatus={setLocalStatus} socketRef={socketRef} users={users} setUsers={setUsers} chatId={chatId} />
          )}
          <ChatRoom cookie={cookie} chatId={chatId} />
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
