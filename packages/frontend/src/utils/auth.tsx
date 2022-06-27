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
    const isUserAuth: any = await isAuth(ctx);
    const { query } = ctx;
    const currPath = ctx.resolvedUrl;

    if (!isUserAuth && currPath !== "/") return redirectTo(constants.HOST_URL as string, ctx, currPath);
    if (getServerSideProps) {
      console.log(ctx.query, "another ssr quori");

      console.log(query, "kuori");
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
    console.log(ctx.query, "yeat another ssr quori");
    const currPath = await generic.getFirstChat(cookie.get("id"), cookie.get("token"));
    const desiredURL: string = cookie.get("REDIRECT_URL_CALLBACK");
    const path = desiredURL || currPath;

    if (isUserAuth && ctx.resolvedUrl !== path) return redirectTo(`/${path}`, ctx);

    if (getServerSideProps) {
      const gssp = await getServerSideProps(ctx);
      console.log(ctx.query, "vandangan");

      return {
        props: {
          cookie: ctx.req?.headers.cookie || "",
          ...ctx.query,
          ...gssp.props,
        },
      };
    }
    return {
      props: {
        cookie: ctx.req?.headers.cookie || "",
        ...ctx.query,
      },
    };
  };
};

export default withAuthSync;
