import { NextPageContext } from "next";

const redirectTo = (ctx: NextPageContext, redirectURL) => {
  console.log(redirectURL);

  return {
    redirect: {
      destination: redirectURL,
      permanent: true,
    },
  };
};

export default redirectTo;
