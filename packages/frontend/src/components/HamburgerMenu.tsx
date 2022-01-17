import React from "react";
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
      className="hamburger"
      onClick={() =>
        dispatch({ type: "SET_MOBILE_NAV", payload: !state.setMobileNav })
      }
    />
  );
}

export default HamburgerMenu;
