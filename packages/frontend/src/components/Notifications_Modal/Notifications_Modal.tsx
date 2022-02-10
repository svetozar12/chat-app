import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import { Socket } from "socket.io-client";
import PendingChats from "components/PendingChats/PendingChats";
import { InitialState2 } from "redux/state";
import { Iinvites } from "pages/[acc]";
import styled from "@emotion/styled";

const Notification_items = styled.div`
  overflow-y: auto;
  width: 100%;
`;
function Notifications({
  contacts,
  socketRef,
  setLocalStatus,
}: {
  contacts: Iinvites[];
  socketRef: Socket | any;
  setLocalStatus: React.Dispatch<React.SetStateAction<string>>;
}) {
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const dispatch = useDispatch();
  const checkSize = contacts.filter((element) => element.status != "accepted");

  return (
    <div className="fRequests_modal">
      <section
        style={{ position: "relative", textAlign: "center" }}
        className="modal_heading flex"
      >
        <h1 style={{ padding: "0 25%" }}>Notifications</h1>
        <div
          onClick={() => {
            dispatch({
              type: "SET_FRIEND_REQUEST",
              payload: !state.setFriendRequest,
            });
          }}
          style={{ width: "3rem", height: "3rem", margin: "0 1rem" }}
          className="circle_border absolute_top_right flex"
        >
          <GrClose style={{ width: "2rem", height: "2rem" }} />
        </div>
      </section>
      <Notification_items>
        {checkSize.length === 0 && (
          <h1 className="flex">No Chat suggestions</h1>
        )}
        {contacts.map((item, index) => {
          return (
            socketRef && (
              <PendingChats
                key={index}
                socketRef={socketRef}
                setLocalStatus={setLocalStatus}
                {...item}
              />
            )
          );
        })}
      </Notification_items>
    </div>
  );
}

export default Notifications;
