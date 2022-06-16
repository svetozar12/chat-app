const redirectTo = (redirectURL) => {
  console.log(redirectURL, "uriloka");

  return {
    redirect: {
      destination: redirectURL,
      permanent: true,
    },
  };
};

export default redirectTo;
