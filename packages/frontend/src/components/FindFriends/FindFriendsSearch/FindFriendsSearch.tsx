import { css } from "@emotion/css";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { IInitialSet } from "../../../services/redux/reducer/setReducer/state";

const FindFriendsSearch = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);

  return (
    <div className="flex" style={{ width: "95%", position: "relative" }}>
      <div
        className={css`
          width: 95%;
          border-radius: 25px;
          margin: 1rem 0;
          padding: 0.3rem;
          background: rgba(122, 122, 122, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          &:focus-within {
            box-shadow: 0 0 5px;
          }
        `}
      >
        <BsSearch style={{ cursor: "pointer", color: "black" }} />
        <input
          className={css`
            width: 90%;
            margin: 0 1rem;
            background: transparent;
            border: none;
            outline: none;
          `}
          onChange={(e) => dispatch({ type: "SET_RECIEVER", payload: e.target.value })}
          placeholder="Search for chats"
          value={state.reciever}
          type="search"
        />
      </div>
    </div>
  );
};

export default FindFriendsSearch;
