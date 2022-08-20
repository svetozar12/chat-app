import React from 'react';
import { css } from '@emotion/css';
import AddGroupChat from '../../../AddGroupChat';

function ChatHeader() {
  return (
    <div
      title="chat_header"
      className={css`
        position: relative;
        width: 100%;
        height: 10rem;
        background: var(--main-white);
        z-index: 9999;
      `}
    >
      <AddGroupChat />
    </div>
  );
}

export default ChatHeader;
