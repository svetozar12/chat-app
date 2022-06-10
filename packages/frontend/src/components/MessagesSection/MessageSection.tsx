import React from "react";
import { css, cx } from "@emotion/css";
import { useSelector } from "react-redux";
import { IInitialSet } from "../../redux/reducer/setReducer/state";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
// components
import ChatRoom from "../ChatRoom";
import Notifications_Modal from "../Notifications_Modal";
import AddUsers_Modal from "../AddUsers_Modal";
import { IAuthState } from "../../redux/reducer/authReducer/state";
import api_helper from "../../graphql/api_helper";

interface IContacts {
  _id: string;
  inviter: string;
  reciever: string;
  status: string;
}

interface IMessageSection {
  contacts: IContacts[];
  socketRef: Socket | null;
  fetchInviteStatus: () => Promise<any>;
  fetchInviterStatus: () => Promise<any>;
  chatId: string;
}

const MessageSection = ({ contacts, socketRef, fetchInviteStatus, fetchInviterStatus, chatId }: IMessageSection) => {
  const [users, setUsers] = React.useState<any[]>([]);
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const authState = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const route = useRouter();

  const getMembersSuggestions = async () => {
    try {
      const res = await fetchInviteStatus();
      const res_inviter = await fetchInviterStatus();
      const res_chat = await api_helper.chatroom.getById(
        window.location.pathname,
        authState.cookie?.id as string,
        authState.cookie?.token as string,
      );
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
      title="message_section"
      className={cx(
        "flex",
        css`
          width: 71%;
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
          {state.setFriendRequest && <Notifications_Modal contacts={contacts} socketRef={socketRef} />}

          {state.setModalInvite && socketRef && <AddUsers_Modal socketRef={socketRef} users={users} setUsers={setUsers} chatId={chatId} />}
          <ChatRoom chatId={chatId} />
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
