import { Cookie, useCookie } from "next-cookie";
import { ICtx } from "./auth";

const redirectTo = (redirectURL: string, ctx: ICtx, prevPath?: string) => {
  return {
    redirect: {
      destination: `${prevPath ? `${redirectURL}?callback=${prevPath}` : redirectURL}`,
      permanent: false,
    },
  };
};

export default redirectTo;
