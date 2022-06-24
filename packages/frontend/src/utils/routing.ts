import { Cookie, useCookie } from "next-cookie";
import { ICtx } from "./auth";

const redirectTo = (redirectURL: string, ctx: ICtx, prevPath?: string) => {
  console.log(redirectURL, "LAMABANGA");
  return {
    redirect: {
      destination: `${redirectURL}?callback=${prevPath}`,
      permanent: false,
    },
  };
};

export default redirectTo;
