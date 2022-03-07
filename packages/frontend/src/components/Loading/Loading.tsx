import React from "react";
import { css, keyframes } from "@emotion/css";
const Loading = () => {
  return (
    <div
      className={css`
        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 4px solid rgba(10, 10, 220, 0.2);
        &:before {
          display: block;
          position: relative;
          left: calc(5px * -1);
          top: calc(5px * -1);
          content: " ";
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 4px solid;
          border-color: rgba(10, 10, 220, 1) transparent transparent transparent;
          animation: ${keyframes`from,0%,to 
          {
            transform: rotate(0deg);
          }
        100% {
            transform: rotate(360deg);
          }`} 0.8s ease-out infinite;
        }
      `}
    ></div>
  );
};

export default Loading;
