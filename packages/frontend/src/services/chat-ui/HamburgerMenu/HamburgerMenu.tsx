// eslint-disable-next-line import/named
import { Box, BoxProps } from '@chakra-ui/react';
import { css, cx } from '@emotion/css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IBaseComponent } from '../types';

type Base = IBaseComponent<BoxProps>;
interface IHambugerMenu extends Base {
  toggleHamburger: () => void;
}

function HamburgerMenu(props: IHambugerMenu) {
  const { toggleHamburger, baseProps, chakraProps, style } = props;
  return (
    <Box
      className={cx(
        'flex',
        css`
          position: absolute;
          top: 0;
          left: 0;
          width: 3rem;
          height: 3rem;
          border: 1px solid transparent;
          margin: 1rem;
          &:active {
            background: var(--gradient-first);
            border-radius: 100%;
          }
        `,
      )}
      {...chakraProps}
      {...style}
      {...baseProps}
    >
      <GiHamburgerMenu
        title="hamburger"
        className={css`
          display: inline-block;
          cursor: pointer;
          width: 2rem;
          height: 2rem;
          zindex: -11;
          @media (min-width: 980px) {
            display: none;
          } ;
        `}
        onClick={toggleHamburger}
      />
    </Box>
  );
}

export default HamburgerMenu;
