import React from "react";
import { Button } from "../../styledComponents";
import { css, cx } from "@emotion/css";
import Link from "next/link";
import Loading from "../../Loading";
import { useDispatch } from "react-redux";

const QuickLogin_Modal = ({ quickLogin, isLogging }: { quickLogin: () => void; isLogging: boolean }) => {
  const dispatch = useDispatch();
  return (
    <div style={{ width: "75%", height: "30vh", position: "absolute", zIndex: "200" }} className="fRequests_modal flex">
      <div
        className={cx(
          css`
            width: 100%;
          `,
          "flex",
        )}
      >
        {isLogging && <Loading />}
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
