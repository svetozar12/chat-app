import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitialState2 } from "../redux/state";
function HamburgerMenu() {
  const dispatch = useDispatch();
  const state = useSelector(
    (state: { setReducer: InitialState2 }) => state.setReducer,
  );
  return (
    <div
      className={`hamburger ${state.setMobileNav && "change"}`}
      onClick={() =>
        dispatch({ type: "SET_MOBILE_NAV", payload: !state.setMobileNav })
      }
    >
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}

export default HamburgerMenu;
