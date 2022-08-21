import React, { useEffect } from 'react';
import { Alert, AlertIcon, AlertTitle, CloseButton, HStack, StackProps } from '@chakra-ui/react';
import { IBaseComponent } from 'services/chat-ui';

type Base = IBaseComponent<StackProps>;

interface IAlerts extends Base {
  message: string;
  closeAlert: () => void;
  type: 'info' | 'warning' | 'success' | 'error';
}

function Alerts(props: IAlerts) {
  const { type, message, closeAlert, chakraProps, baseProps, style } = props;

  // const dispatch = useDispatch();
  // const closeAlert = () => {
  //   dispatch({ type: "LOGIN_POST_ERROR", bad: "" });
  //   dispatch({ type: "REGISTER_POST", good: "" });
  //   dispatch({ type: "REGISTER_POST_ERROR", bad: "" });
  // };

  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 5000);
  }, []);

  return (
    <HStack pos="absolute" w="60%" transform="translate(50%,-600%)" top="50%" right="50%" {...chakraProps} {...style} {...baseProps}>
      <Alert status={type}>
        <AlertIcon />
        <AlertTitle textAlign="center" w="full">
          {message}
        </AlertTitle>
        <CloseButton alignSelf="flex-start" position="relative" right={0} top={0} onClick={closeAlert} />
      </Alert>
    </HStack>
  );
}
export type { IAlerts };
export default Alerts;
