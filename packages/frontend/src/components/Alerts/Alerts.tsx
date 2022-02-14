import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitialState } from "redux/state";
import { css } from "@emotion/css";
import { IoClose } from "react-icons/io5";
export const Alerts = () => {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { authReducer: InitialState }) => state.authReducer,
  );
  if (!state.good && !state.bad)
    return (
      <div
        className={css`
          width: 100%;
          min-height: 3.5rem;
          max-height: 10rem;
          margin-bottom: 1rem;
        `}
      ></div>
    );
  const closeAlert = () => {
    dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
    dispatch({ type: "REGISTER_POST", good: "" });
    dispatch({ type: "REGISTER_POST_ERROR", bad: "" });
  };
  return (
    <div
      className={css`
        position: relative;
        border-radius: 5px;
        background: var(--bad-alert-bgcolor);
        width: 70%;
        padding: 0.2rem 0;
        height: auto;
        min-height: 3.5rem;
        max-height: 10rem;
        display: flex;
        margin-bottom: 1rem;
        align-items: center;
        justify-content: center;
        font-size: 1.9rem;
        color: ${state.good
          ? "var(--good-alert-color)"
          : "var(--bad-alert-color)"};
        background: ${state.good
          ? "var(--good-alert-bgcolor)"
          : "var(--bad-alert-bgcolor)"};
        border-left: 5px solid
          ${state.good ? "var(--good-alert-color)" : "var(--bad-alert-color)"};
      `}
    >
      <p className="flex" style={{ width: "95%", margin: "0" }}>
        {state.good || state.bad}
      </p>
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 112%;
          width: 5%;
          padding: 0 0.5rem;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        `}
      >
        <IoClose
          onClick={closeAlert}
          className={css`
            width: 2.5rem;
            height: 2.5rem;
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
