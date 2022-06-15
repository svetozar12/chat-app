import { NextPageContext } from "next";
import { useCookie } from "next-cookie";

const withAuthSync = (WrappedComponent) => (props) => {
  return <WrappedComponent {...props} />;
};

withAuthSync.isAuth = (ctx: NextPageContext) => {
  const cookie = useCookie(ctx);
  if (!cookie.has("name") && !cookie.has("token")) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
};

export default withAuthSync;
