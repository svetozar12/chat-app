import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IInitialSet } from "../../redux/reducer/setReducer/state";
import { GrClose } from "react-icons/gr";
import CheckBox_component from "../CheckBox_component";
import { constants } from "../../constants";
import { Socket } from "socket.io-client";
import axios from "axios";
import { css } from "@emotion/css";

interface IAddUsers_Modal {
  users: string[];
  socketRef: Socket;
  chatId: string;
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddUsers_Modal = ({ users, socketRef, chatId, setUsers }: IAddUsers_Modal) => {
  const [invited, setInvited] = React.useState<string[]>([]);
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);
  const addMembers = async (user: string[]) => {
    try {
      await axios.put(`${constants.GRAPHQL_URL}/chat-room/${chatId}`, {
        usernames: user,
      });
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
    <div
      className={css`
        position: fixed;
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: !important start;
        z-index: 9999;
        width: 40%;
        background: var(--main-white);
        overflow: hidden;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        @media (min-width: 1010px) {
          width: 70%;
        }
      `}
    >
      <section style={{ position: "relative", textAlign: "center" }} className="modal_heading flex">
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
      <div className="flex" style={{ overflowY: "auto", width: "100%", flexDirection: "column" }}>
        {users.length === 0 && <h1>No Chat suggestions</h1>}
        {users.map((item, index) => {
          return <CheckBox_component key={index} invited={invited} setInvited={setInvited} item={item} />;
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

export default AddUsers_Modal;
