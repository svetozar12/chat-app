import response from "./Auth";

const AuthResolver = {
  Query: {
    async authUser() {
      const data = await response();
      return data.authData;
    },
  },
};

export default AuthResolver;
