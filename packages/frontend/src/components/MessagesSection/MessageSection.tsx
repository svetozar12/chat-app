import React from "react";
import { css, cx } from "@emotion/css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Socket } from "socket.io-client";
// components
import ChatRoom from "../ChatRoom";
import Notifications_Modal from "../Notifications_Modal";
import AddUsers_Modal from "../AddUsers_Modal";
// services
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import api_helper from "../../services/graphql/api_helper";
import { useCookie } from "next-cookie";

interface IContacts {
  _id: string;
  inviter: string;
  reciever: string;
  status: string;
}

interface IMessageSection {
  contacts: IContacts[];
  socketRef: Socket | null;
  FetchInvites: (status: "accepted" | "recieved" | "declined", InvitesOrigin: "reciever" | "inviter") => Promise<any>;
  chatId: string;
}

const MessageSection = ({ contacts, socketRef, FetchInvites, chatId }: IMessageSection) => {
  const [users, setUsers] = React.useState<any[]>([]);
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const cookie = useCookie();
  const route = useRouter();

  const getMembersSuggestions = async () => {
    try {
      const res = await FetchInvites("accepted", "inviter");
      const res_inviter = await FetchInvites("accepted", "inviter");
      const res_chat = await api_helper.chatroom.getById(window.location.pathname, cookie.get("id"), cookie.get("token"));
      const [{ members: Message }] = res_chat;

      const members_in_chat = Message;

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
    return;
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
          {state.setFriendRequest && contacts && <Notifications_Modal contacts={contacts} socketRef={socketRef} />}

          {state.setModalInvite && socketRef && <AddUsers_Modal socketRef={socketRef} users={users} setUsers={setUsers} chatId={chatId} />}
          <ChatRoom chatId={chatId} />
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
