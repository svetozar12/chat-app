import { useEffect } from 'react';
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
    <HStack pos="absolute" transform="translate(50%,-50%)" top="20%" right="50%" {...chakraProps} {...style} {...baseProps}>
      <Alert status={type} zIndex="99999">
        <AlertIcon w="20" h="20" />
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
