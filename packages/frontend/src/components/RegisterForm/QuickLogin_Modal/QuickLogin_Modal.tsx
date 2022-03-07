import React from "react";
import { Button } from "../../styledComponents";
import { css, cx } from "@emotion/css";
import Link from "next/link";
import Loading from "../../Loading";

const QuickLogin_Modal = ({ quickLogin, isLogging }: { quickLogin: () => void; isLogging: boolean }) => {
  return (
    <div style={{ width: "75%", height: "30vh" }} className="fRequests_modal flex">
      <div
        className={cx(
          css`
            width: 100%;
          `,
          "flex",
        )}
      >
        {isLogging ? (
          <div
            className={cx(
              css`
                width: 50%;
              `,
              "flex",
            )}
          >
            <Loading />
          </div>
        ) : (
          <Button
            className={css`
              width: 50%;
            `}
            onClick={quickLogin}
          >
            Click me to Quick login
          </Button>
        )}
        <Link href="/" passHref>
          <Button
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
