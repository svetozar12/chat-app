import { css, cx } from "@emotion/css";
import { useSelector, useDispatch } from "react-redux";
import { IInitialSet } from "../../services/redux/reducer/setReducer/state";
import { GiHamburgerMenu } from "react-icons/gi";
function HamburgerMenu() {
  const dispatch = useDispatch();
  const state = useSelector((state: { setReducer: IInitialSet }) => state.setReducer);

  return (
    <div
      className={cx(
        "flex",
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
        onClick={() => dispatch({ type: "SET_MOBILE_NAV", payload: !state.setMobileNav })}
      />
    </div>
  );
}

export default HamburgerMenu;
