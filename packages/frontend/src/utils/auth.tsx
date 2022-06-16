import { useCookie } from "next-cookie";
import { isAuth } from "./authMethods";
import { getFirstChat } from "./getFirstChat";
import redirectTo from "./routing";

const withAuthSync = (getServerSideProps?: Function) => {
  return async (ctx) => {
    const cookie = useCookie(ctx);
    const isUserAuth: boolean = await isAuth(ctx);

    if (!isUserAuth) return redirectTo(ctx, "/");
    const chat_id = await getFirstChat(cookie.get("id"), cookie.get("token"));
    if (isUserAuth) redirectTo(ctx, `/${chat_id}`);
    if (getServerSideProps) {
      const gssp = await getServerSideProps(ctx);

      return {
        props: {
          ...gssp.props,
        },
      };
    }
  };
};

export default withAuthSync;
