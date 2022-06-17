import { Cookie, useCookie } from "next-cookie";
import { ICtx } from "./auth";

const redirectTo = (redirectURL: string, ctx: ICtx, prevPath?: string) => {
  ctx.res?.setHeader("set-cookie", `REDIRECT_URL_CALLBACK=${prevPath}; path=/; samesite=None;`);
  return {
    redirect: {
      destination: redirectURL,
      permanent: false,
    },
  };
};

export default redirectTo;
