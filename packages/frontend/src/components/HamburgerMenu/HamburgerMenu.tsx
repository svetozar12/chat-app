import { css, cx } from "@emotion/css";
import { useSelector, useDispatch } from "react-redux";
import { InitialState2 } from "../../redux/state";
import { GiHamburgerMenu } from "react-icons/gi";
function HamburgerMenu() {
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: InitialState2 }) => state.setReducer);
  return (
    <div
      className={cx(
        "flex",
        css`
          width: 3rem;
          height: 3rem;
          border: 1px solid transparent;
          &:active {
            background: var(--gradient-first);
            border-radius: 100%;
          }
        `,
      )}
    >
      <GiHamburgerMenu
        title="hamburger"
        className={css`
          display: inline-block;
          cursor: pointer;
          width: 2rem;
          height: 2rem;
          left: 0;
          zindex: -11;
          @media (min-width: 1008px) {
            display: none;
          } ;
        `}
        onClick={() => dispatch({ type: "SET_MOBILE_NAV", payload: !state.setMobileNav })}
      />
    </div>
  );
}

export default HamburgerMenu;
