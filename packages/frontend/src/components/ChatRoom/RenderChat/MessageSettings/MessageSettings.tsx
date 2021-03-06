import React from "react";
import { css } from "@emotion/css";
import { useDispatch } from "react-redux";
import { requestUrl } from "../../../../utils/hostUrl_requestUrl";
import axios from "axios";

const options = css`
  background: transparent;
  border: none;
  border-radius: 5px;
  padding: 1rem;
  width: 90%;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

interface IMessageSettings {
  id: string;
  translateX: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

function MessageSettings({ id, translateX, setEditing, setSettings }: IMessageSettings) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await axios.delete(`${requestUrl}/messages/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleEdit = async () => {
    try {
      // some stuff with axios
      setEditing(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleClick = (status: string) => {
    setSettings(false);
    status === "delete" && handleDelete();
    status === "edit" && handleEdit();
  };
  return (
    <div
      title="message_settings"
      className={css`
        width: 10rem;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: var(--main-white) !important;
        border-radius: 5px !important;
        text-align: left;
        top: 0;
        right: 0;
        margin: 0;
        z-index: 12;
        padding: 0.2rem 0;
        transform: translate(${translateX}, 0);
        box-shadow: 2px 2px 22px 1px var(--main-box-shadow);
        color: var(--main-black);
        @media (min-width: 1008px) {
          width: 15rem;
        }
      `}
    >
      <button
        onClick={() => {
          dispatch({ type: "DELETE_MESSAGE", payload: id });
          handleClick("delete");
        }}
        className={options}
      >
        Delete Message
      </button>
      <button onClick={() => handleClick("edit")} className={options}>
        Edit Message
      </button>
    </div>
  );
}

export default MessageSettings;
