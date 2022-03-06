import React from "react";
import { css } from "@emotion/css";
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

function MessageSettings({ translateX }: { translateX: string }) {
  return (
    <div
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
      <button className={options}>Delete Message</button>
      <button className={options}>Edit Message</button>
    </div>
  );
}

export default MessageSettings;
