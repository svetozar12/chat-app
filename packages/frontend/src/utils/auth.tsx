import { NextPageContext } from "next";
import { useCookie } from "next-cookie";
import { isAuth } from "./authMethods";
import { getFirstChat } from "./getFirstChat";
import redirectTo from "./routing";

export interface ICtx extends NextPageContext {
  resolvedUrl: string;
}

const withAuthSync = (getServerSideProps?: Function) => {
  return async (ctx: ICtx) => {
    const isUserAuth: any = await isAuth(ctx);
    const currPath = ctx.resolvedUrl;
    const cookie = useCookie(ctx);
    console.log(isUserAuth, "AUTH");

    if (!isUserAuth && currPath !== "/") return redirectTo("/");
    const chat_id = await getFirstChat(cookie.get("id"), cookie.get("token"));
    if (isUserAuth && currPath !== `/${chat_id}`) redirectTo(`/${chat_id}`);

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
