import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialState2 } from "../redux/state";
import { GrClose } from "react-icons/gr";
import { CheckBox_component } from "./CheckBox_component";
import { requestUrl } from "../utils/hostUrl_requestUrl";
import { Socket } from "socket.io-client";
import axios from "axios";
export const AddUsers_Modal = ({
  users,
  socketRef,
  setLocalStatus,
  chatId,
  setUsers,
}: {
  users: string[];
  socketRef: Socket;
  setLocalStatus: React.Dispatch<React.SetStateAction<string>>;
  chatId: string;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [invited, setInvited] = React.useState<string[]>([]);
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );

  const addMembers = async (user: string[]) => {
    try {
      setLocalStatus("d");
      await axios.put(`${requestUrl}/chat-room/${chatId}`, {
        usernames: user,
      });
      setLocalStatus("");
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      if (invited.length <= 0) return;
      await addMembers(invited);
      setUsers(users.filter((element) => !invited.includes(element)));
      socketRef.emit("inviting_multiple_users", { users: invited });
      setInvited([]);

      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="fRequests_modal">
      <section
        style={{ position: "relative", textAlign: "center" }}
        className="modal_heading flex"
      >
        <h1 style={{ padding: "0 25%" }}>Add people</h1>
        <div
          onClick={() => {
            dispatch({
              type: "SET_MODAL_INVITE",
              payload: !state.setModalInvite,
            });
          }}
          style={{ width: "3rem", height: "3rem" }}
          className="circle_border absolute_top_right flex"
        >
          <GrClose style={{ width: "2rem", height: "2rem" }} />
        </div>
      </section>
      <div
        className="flex"
        style={{ overflowY: "auto", width: "100%", flexDirection: "column" }}
      >
        {users.length === 0 && <h1>No Chat suggestions</h1>}
        {users.map((item, index) => {
          return (
            <CheckBox_component
              key={index}
              invited={invited}
              setInvited={setInvited}
              item={item}
            />
          );
        })}
      </div>
      <div className="modal_footer flex">
        <button onClick={handleSubmit} className="button" type="submit">
          submit
        </button>
      </div>
    </div>
  );
};
