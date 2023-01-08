import React from 'react';
// import PendingChats from "components/Notifications_Modal/PendingChats";
import { css } from '@emotion/css';
import { CloseButton, Divider, Flex, Heading, ScaleFade, ScaleFadeProps } from '@chakra-ui/react';
import s from './Modal.module.css';
import { IBaseComponent } from '../types';
import useThemeColors from '../../../hooks/useThemeColors';

type Base = IBaseComponent<ScaleFadeProps>;
interface IModal extends Base {
  closeModal: () => void;
  heading: string;
  children: JSX.Element | JSX.Element[];
}

function Modal(props: IModal) {
  const { closeModal, children, heading, style, baseProps, chakraProps } = props;
  const {
    base: {
      form: { background },
    },
  } = useThemeColors();

  const modalVariant = {
    hide: {
      scale: 0.8,
    },
    show: {
      y: '-50%',
      x: '-50%',
      scale: 1,
    },
    exit: {
      scale: 0.8,
    },
  };

  return (
    <ScaleFade
      style={{ background: background }}
      className={s.box}
      variants={modalVariant}
      initial="hide"
      animate="show"
      exit="exit"
      {...chakraProps}
      {...style}
      {...baseProps}
    >
      <Flex alignItems="center" h="5rem" justifyItems="center" justifyContent="center">
        <Heading m="1rem">{heading}</Heading>
      </Flex>
      <Divider />
      <CloseButton size="lg" pos="absolute" right={0} top={0} m={5} mt="-0.5px !important" onClick={closeModal} />
      <div
        className={css`
          overflow-y: auto;
          width: 100%;
        `}
      >
        {children}
      </div>
    </ScaleFade>
  );
}

export default Modal;
