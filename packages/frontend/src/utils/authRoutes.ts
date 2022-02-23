import { requestUrl } from "./hostUrl_requestUrl";
import axios from "axios";
export interface ITokens {
  name?: string;
  JWT: string | false;
  refreshJWT: string | false;
}
export const createJWT = async (
  input_username: string,
  input_password: string,
): Promise<ITokens | false> => {
  try {
    const res = await axios.post(`${requestUrl}/auth/login`, {
      username: input_username,
      password: input_password,
    });
    const JWT = res.data.Access_token;
    const refreshJWT = res.data.Refresh_token;
    const tokens: ITokens = {
      JWT,
      refreshJWT,
    };
    return tokens;
  } catch (error) {
    return false;
  }
};

export const checkRefreshToken = async (refresh_token: string) => {
  try {
    const refreshToken = await axios.post(`${requestUrl}/auth/refresh`, {
      refresh_token: refresh_token,
    });
    const username = refreshToken.data.username;
    const JWT = refreshToken.data.Access_token;
    const refreshJWT = refreshToken.data.Refresh_token;
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

export const checkJWT = async (JWT: string): Promise<string | false> => {
  try {
    const authRoute = await axios.get(`${requestUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
    const user = authRoute.data.authData.username;

    return user.username;
  } catch (error) {
    return false;
  }
};

export const loginAuth = async (
  input_username: string,
  input_password: string,
) => {
  try {
    const tokens = await createJWT(input_username, input_password);
    // @ts-ignore
    await checkJWT(tokens.JWT);
    return tokens;
  } catch (error) {
    return false;
  }
};
