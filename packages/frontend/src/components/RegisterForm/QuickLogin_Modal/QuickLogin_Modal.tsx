import React from "react";
import { Button } from "../../styledComponents";
import { css, cx } from "@emotion/css";
import Link from "next/link";
import { useDispatch } from "react-redux";

const QuickLogin_Modal = ({ quickLogin }: { quickLogin: () => void }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={cx(
        "fRequests_modal",
        "flex",
        css`
          width: 75%;
          height: 30vh;
          position: absolute;
          z-index: 200;
        `,
      )}
    >
      <div
        className={cx(
          css`
            width: 100%;
          `,
          "flex",
        )}
      >
        <Button
          className={css`
            width: 50%;
          `}
          onClick={() => {
            quickLogin();
          }}
        >
          Click me to Quick login
        </Button>
        <Link href="/" passHref>
          <Button
            onClick={() => dispatch({ type: "QUICK_LOGIN", payload: false })}
            className={css`
              width: 50%;
            `}
          >
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuickLogin_Modal;
