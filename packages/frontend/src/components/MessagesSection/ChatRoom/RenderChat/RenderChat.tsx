import { css, cx } from '@emotion/css';
import React from 'react';
// components
import { useCookie } from 'next-cookie';
import { Heading, HStack } from '@chakra-ui/react';
// services
import useThemeColors from 'hooks/useThemeColors';
import Message from 'components/MessagesSection/ChatRoom/RenderChat/subcomponents/Message';

interface IRenderChat {
  id: string;
  sender: string;
  timeStamp: string | number;
  recievedMessage: string;
  chatId: string;
}

const mineMessages = css`
  align-items: flex-end;
  justify-content: center;
  color: var(--main-white);
  flex-direction: column;
`;

const otherMessages = css`
  align-items: flex-start;
  justify-content: center;
  color: var(--main-black);
  flex-direction: column;
`;

function RenderChat(props: IRenderChat) {
  const { id, sender, timeStamp, recievedMessage } = props;
  const cookie = useCookie();
  const name = cookie.get('name');

  const {
    base: {
      default: { color },
    },
  } = useThemeColors();

  return (
    <HStack
      gap={5}
      className={cx(
        'flex',
        css`
          justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
          width: 100%;
        `,
        { [mineMessages]: name === sender },
        { [otherMessages]: name !== sender },
      )}
    >
      <Heading
        color={color}
        fontSize="lg"
        className={css`
          justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
          font-size: 15px;
        `}
      >
        {name === sender ? null : sender}
      </Heading>
      <div
        className={cx(
          'flex',
          css`
            width: 100%;
            justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
          `,
        )}
      >
        <Message messageId={id} recievedMessage={recievedMessage} sender={sender} timeStamp={timeStamp} />
      </div>
    </HStack>
  );
}

export default React.memo(RenderChat);
