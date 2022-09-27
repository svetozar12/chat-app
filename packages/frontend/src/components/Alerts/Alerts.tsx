import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAuthState } from "../../services/redux/reducer/authReducer/state";
import { css } from "@emotion/css";
import { IoClose } from "react-icons/io5";
const Alerts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: { authReducer: IAuthState }) => state.authReducer);
  const closeAlert = () => {
    dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
    dispatch({ type: "REGISTER_POST", good: "" });
    dispatch({ type: "REGISTER_POST_ERROR", bad: "" });
  };
  return (
    <div
      title="alert message"
      className={css`
        position: absolute;
        z-index: 9999;
        top: 0;
        margin-top: 1rem;
        border-radius: 5px;
        background: var(--bad-alert-bgcolor);
        width: 70%;
        padding: 0.2rem 0 0.2rem 0;
        height: auto;
        min-height: 3.5rem;
        max-height: 10rem;
        display: flex;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: center;
        font-size: 1.9rem;
        color: ${state.good ? "var(--good-alert-color)" : "var(--bad-alert-color)"};
        background: ${state.good ? "var(--good-alert-bgcolor)" : "var(--bad-alert-bgcolor)"};
        border-left: 5px solid ${state.good ? "var(--good-alert-color)" : "var(--bad-alert-color)"};
        @media (max-width: 1010px) {
          width: 90%;
          padding: 0.2rem 0 0.2rem 1rem;
          font-size: 1rem;
        }
      `}
    >
      <p className="flex" style={{ width: "95%", margin: "0", color: "var(--main-white)" }}>
        {state.good || state.bad}
      </p>
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 112%;
          width: 3.5rem;
          padding: 0 0.5rem;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        `}
      >
        <IoClose
          onClick={closeAlert}
          className={css`
            width: 3.5rem;
            height: 3.5rem;
            cursor: pointer;
            &:hover {
              color: var(--main-black);
            }
          `}
        />
      </div>
    </div>
  );
};

export default Alerts;
