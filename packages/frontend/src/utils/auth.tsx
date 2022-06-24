import { NextPageContext } from "next";
import { useCookie } from "next-cookie";
import { constants } from "../constants";
import { isAuth } from "./authMethods";
import generic from "./generic";
import redirectTo from "./routing";

export interface ICtx extends NextPageContext {
  resolvedUrl: string;
}

const withAuthSync = (getServerSideProps?: Function) => {
  return async (ctx: ICtx) => {
    console.log(ctx.query, "new_kureo");
    console.log("kureo");
    const isUserAuth: any = await isAuth(ctx);
    const currPath = ctx.resolvedUrl;
    const cookie = useCookie(ctx);

    if (!isUserAuth && currPath !== "/") return redirectTo(constants.HOST_URL as string, ctx, currPath);
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

    const currPath = await generic.getFirstChat(cookie.get("id"), cookie.get("token"));
    const desiredURL: string = cookie.get("REDIRECT_URL_CALLBACK");
    const path = desiredURL || currPath;
    console.log(path, "putq", isUserAuth);

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
