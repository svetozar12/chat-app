/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
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
      css={{
        display: "inline-block",
        cursor: "pointer",
        position: "relative",
        width: "2rem",
        height: "2rem",
        left: "0",
        zIndex: "-11",
        border: "1px solid transparent",
        "&:active": {
          background: "var(--gradient-first)",
          borderRadius: "25px",
        },
        "@media (min-width: 1008px)": {
          display: "none",
        },
      }}
      className="hide"
      onClick={() =>
        dispatch({ type: "SET_MOBILE_NAV", payload: !state.setMobileNav })
      }
    />
  );
}

export default HamburgerMenu;
