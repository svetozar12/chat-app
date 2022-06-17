const redirectTo = (redirectURL) => {
  return {
    redirect: {
      destination: redirectURL,
      permanent: true,
    },
  };
};

export default redirectTo;
