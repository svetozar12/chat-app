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
    const desiredURL: string = cookie.get("REDIRECT_URL_CALLBACK");
    console.log(desiredURL);

    if (!isUserAuth && currPath !== "/") return redirectTo("/", ctx, currPath);
    console.log(cookie.getAll());
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

export const isAlreadyAuth = (getServerSideProps?: Function) => {
  return async (ctx: ICtx) => {
    const isUserAuth: any = await isAuth(ctx);
    const cookie = useCookie(ctx);

    const currPath = await getFirstChat(cookie.get("id"), cookie.get("token"));
    const desiredURL: string = cookie.get("REDIRECT_URL_CALLBACK");
    const path = desiredURL || currPath;
    console.log(cookie.getAll());

    if (isUserAuth && ctx.resolvedUrl !== path) return redirectTo(`/${path}`, ctx);

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
