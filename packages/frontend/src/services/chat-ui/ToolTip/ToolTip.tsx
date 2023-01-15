import { Tooltip } from '@chakra-ui/react';
import useThemeColors from 'hooks/useThemeColors';
import { FC } from 'react';

interface IToolTip {
  label: string;
  children: JSX.Element | JSX.Element[];
}

const ToolTip: FC<IToolTip> = ({ children, label }) => {
  const {
    base: {
      default: { color },
    },
  } = useThemeColors();
  return (
    <Tooltip placement="end" bg={color} hasArrow label={label}>
      {children}
    </Tooltip>
  );
};

export default ToolTip;
