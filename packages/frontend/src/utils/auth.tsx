import { NextPageContext } from "next";
import { useCookie } from "next-cookie";
import { isAuth } from "./authMethods";
import { getFirstChat } from "./getFirstChat";
import redirectTo from "./routing";

const withAuthSync = (getServerSideProps?: Function) => {
  return async (ctx: NextPageContext) => {
    const cookie = useCookie(ctx);
    const isUserAuth: any = await isAuth();
    console.log(ctx.pathname, "copotextoooo");

    const chat_id = await getFirstChat(cookie.get("id"), cookie.get("token"));
    if (!isUserAuth && ctx.pathname === "/") return redirectTo("/");
    // if (isUserAuth) redirectTo(`/${chat_id}`);

    if (getServerSideProps) {
      const gssp = await getServerSideProps(ctx);
      return {
        props: {
          cookie: ctx.req?.headers.cookie || "",
          ...gssp.props,
        },
      };
    }
    return {
      props: {
        cookie: ctx.req?.headers.cookie || "",
      },
    };
  };
};

export default withAuthSync;
