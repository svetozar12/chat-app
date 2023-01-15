import { VStack } from '@chakra-ui/react';
import { css, cx } from '@emotion/css';
import useThemeColors from 'hooks/useThemeColors';
import { connect } from 'react-redux';
import React, { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { resetMessagesAction } from 'services/redux/reducer/messages/actions';
import { useCookie } from 'next-cookie';

type Props = {
  timeStamp: string | number;
  sender: string;
  recievedMessage: string;
} & ReturnType<typeof mapDispatchToProps>;

const Message: FC<Props> = ({ recievedMessage, sender, timeStamp }) => {
  const cookie = useCookie();

  const inputRef = React.useRef<HTMLDivElement>(null);
  const name = cookie.get('name');

  const {
    base: {
      message: { background: msgBg },
    },
  } = useThemeColors();

  return (
    <div
      className={cx(
        'flex',
        css`
          width: 100%;
          justify-content: ${name === sender ? 'flex-end' : 'flex-start'};
        `,
      )}
    >
      {name === sender && (
        <div
          className={css`
            position: relative;
          `}
        ></div>
      )}
      <VStack
        wordBreak="break-word"
        textAlign="center"
        minW="10rem"
        minH="3rem"
        overflow="hidden"
        color="white"
        bg={name === sender ? 'dark_blue' : msgBg}
        ref={inputRef}
        title={timeStamp.toString()}
      >
        <span
          className={cx(
            'flex',
            css`
              padding: 1rem 0.5rem;
            `,
          )}
        >
          {recievedMessage}
        </span>
      </VStack>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetMessages: bindActionCreators(resetMessagesAction, dispatch),
});

export default connect(null, mapDispatchToProps)(Message);
