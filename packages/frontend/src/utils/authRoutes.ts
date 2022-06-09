import api_helper from "../graphql/api_helper";
export interface ITokens {
  name?: string;
  JWT: string | false;
  refreshJWT: string | false;
}
export const createJWT = async (input_username: string, input_password: string): Promise<ITokens | false> => {
  try {
    const res = await api_helper.auth.login(input_username, input_password);

    const JWT = res.Access_token;
    const refreshJWT = res.Refresh_token;
    const tokens: ITokens = {
      JWT,
      refreshJWT,
    };
    return tokens;
  } catch (error) {
    return false;
  }
};

export const checkRefreshToken = async (user_id: string, refresh_token: string) => {
  try {
    const refreshToken = await api_helper.auth.refresh(user_id, refresh_token);

    const username = refreshToken.username;
    const JWT = refreshToken.Access_token;
    const refreshJWT = refreshToken.Refresh_token;
    const tokens: ITokens = {
      name: username,
      JWT,
      refreshJWT,
    };
    return tokens;
  } catch (error) {
    return false;
  }
};

export const checkJWT = async (user_id: string, JWT: string): Promise<string | false> => {
  try {
    const authRoute = await api_helper.user.getById(user_id, JWT);

    return authRoute.username;
  } catch (error) {
    return false;
  }
};

export const loginAuth = async (input_username: string, input_password: string) => {
  try {
    const tokens = await createJWT(input_username, input_password);
    // @ts-ignore
    await checkJWT(tokens.JWT);
    return tokens;
  } catch (error) {
    return false;
  }
};
