import { useCookie } from "next-cookie";
import { ICtx } from "./auth";

const redirectTo = (redirectURL: string, ctx: ICtx, prevPath?: string) => {
  console.log(prevPath);

  const cookie = useCookie(ctx);
  cookie.set("REDIRECT_URL_CALLBACK", prevPath, { path: "/", sameSite: "none" });
  ctx.res?.setHeader("set-cookie", `REDIRECT_URL_CALLBACK=${prevPath}; path=/; samesite=None;`);
  return {
    redirect: {
      destination: redirectURL,
      permanent: false,
    },
  };
};

export default redirectTo;
