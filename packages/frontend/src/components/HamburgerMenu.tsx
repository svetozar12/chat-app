/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { css } from "@emotion/css";
import { useSelector, useDispatch } from "react-redux";
import { InitialState2 } from "../redux/state";
import { GiHamburgerMenu } from "react-icons/gi";
function HamburgerMenu() {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );
  return (
    <GiHamburgerMenu
      className={css`
        display: inline-block;
        cursor: pointer;
        position: absolute;
        width: 3rem;
        height: 3rem;
        left: 0;
        z-index: -11;
        border: 1px solid transparent;
        padding: 0.5rem;
        &:active {
          background: var(--gradient-first);
          border-radius: 25px;
          padding: 0.5rem;
        }
      `}
      onClick={() =>
        dispatch({ type: "SET_MOBILE_NAV", payload: !state.setMobileNav })
      }
    />
  );
}

export default HamburgerMenu;
