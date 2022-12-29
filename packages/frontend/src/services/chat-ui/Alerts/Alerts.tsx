import React, { useEffect } from 'react';
import { Alert, AlertIcon, AlertStatus, AlertTitle, CloseButton, HStack, ScaleFade, StackProps } from '@chakra-ui/react';
import { IBaseComponent } from 'services/chat-ui';
type Base = IBaseComponent<StackProps>;

interface IAlerts extends Base {
  message: string;
  closeAlert: () => void;
  type: AlertStatus;
}

function Alerts(props: IAlerts) {
  const { type, message, closeAlert, chakraProps, baseProps, style } = props;

  useEffect(() => {
    setTimeout(() => {
      closeAlert();
    }, 5000);
  }, []);

  return (
    <ScaleFade in={true}>
      <HStack pos="absolute" w="60%" transform="translate(50%,-600%)" top="50%" right="50%" {...chakraProps} {...style} {...baseProps}>
        <Alert status={type}>
          <AlertIcon />
          <AlertTitle textAlign="center" w="full">
            {message}
          </AlertTitle>
          <CloseButton alignSelf="flex-start" position="relative" right={0} top={0} onClick={closeAlert} />
        </Alert>
      </HStack>
    </ScaleFade>
  );
}
export type { IAlerts };
export default Alerts;
