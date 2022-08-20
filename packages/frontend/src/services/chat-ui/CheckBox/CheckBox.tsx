import React from 'react';
import { css, cx } from '@emotion/css';
// eslint-disable-next-line import/named
import { Box, BoxProps, Text } from '@chakra-ui/react';
import { IBaseComponent } from '../types';

type Base = IBaseComponent<BoxProps>;
interface ICheckBox extends Base {
  item: string;
  invited: string[];
  setInvited: React.Dispatch<React.SetStateAction<string[]>>;
}

function CheckBox(props: ICheckBox) {
  const { item, invited, setInvited, chakraProps, baseProps, style } = props;

  const [isChecked, setIsChecked] = React.useState(false);
  React.useEffect(() => {
    if (isChecked) return setInvited([...invited, item]);
    const newArr = invited.filter((element) => element !== item);
    setInvited(newArr);
  }, [isChecked]);

  return (
    <Box
      title="checkbox"
      onClick={() => setIsChecked(!isChecked)}
      className={cx(
        'flex',
        css`
          width: 95%;
          border-top: 1px solid rgba(0, 0, 0, 0.3);
          justify-content: space-between;
          cursor: pointer;
        `,
      )}
      {...chakraProps}
      {...style}
      {...baseProps}
    >
      <Text fontSize="1.3rem">{item}</Text>
      <input
        className={css`
          width: 1.25rem;
          height: 1.25rem;
          margin: 0 1rem;
        `}
        type="checkbox"
        onChange={() => setIsChecked(!isChecked)}
        checked={isChecked}
        value={item}
      />
    </Box>
  );
}

export default CheckBox;
