import { requestUrl } from "./hostUrl_requestUrl";
import axios from "axios";

const createJWT = async (input: string) => {
  try {
    const res = await axios.post(`${requestUrl}/auth/login`, {
      username: input,
    });
    const JWT = res.data.token;
    return JWT;
  } catch (error) {
    return false;
  }
};

export const checkJWT = async (JWT: string) => {
  try {
    const authRoute = await axios.get(`${requestUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
    const user = authRoute.data.authData.user;

    return user.username;
  } catch (error) {
    return false;
  }
};

export const loginAuth = async (input: string) => {
  try {
    const JWT = await createJWT(input);
    await checkJWT(JWT);
    return JWT;
  } catch (error) {
    return false;
  }
};
