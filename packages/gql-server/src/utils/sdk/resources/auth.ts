import { GraphQLYogaError } from "@graphql-yoga/node";
import { AxiosError } from "axios";
import { instance } from "..";
import AxiosErrorHandler from "../../AxiosErrorHandler";
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
    try {
      return await instance.post(`${basePath}/refresh/${userId}`, null, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
    } catch (error: any) {
      console.log(error.response.data.ErrorMsg, "axios");

      return new GraphQLYogaError(error.message);
    }
  },
};

export default auth;
