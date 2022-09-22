import { JWT, Login } from "../types/auth";
import { Auth, Message, Response } from "../types/common";
import makeRequest, { Method } from "../../makeRequest";

const basePath = "/auth";

const auth = {
  login: async (body: Login): Response<JWT> => {
    return makeRequest(Method.POST, `${basePath}/login`, body);
  },
  refresh: async (userId: string, RefreshToken: string): Response<JWT> => {
    return await makeRequest(Method.POST, `${basePath}/refresh/${userId}`, {
      RefreshToken,
    });
  },
  logout: async (auth: Auth): Response<Message> => {
    const { userId, AccessToken } = auth;
    return makeRequest(
      Method.POST,
      `${basePath}/refresh/${userId}`,
      undefined,
      {
        headers: { Authorization: `Bearer ${AccessToken}` },
      },
    );
  },
};

export default auth;