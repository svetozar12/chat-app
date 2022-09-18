import { GraphQLYogaError } from "@graphql-yoga/node";
import { AxiosError } from "axios";
import { instance } from "..";
import AxiosErrorHandler from "../../AxiosErrorHandler";
import { JWT, Login } from "../types/auth";
import { Auth, Message, Response } from "../types/common";

const basePath = "/auth";

const auth = {
  login: async (body: Login): Response<JWT> => {
    try {
      const res = await instance.post(`${basePath}/login`, body);
      return res.data;
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
  },
  refresh: async (userId: string, RefreshToken: string): Response<JWT> => {
    try {
      return await instance.post(`${basePath}/refresh/${userId}`, {
        RefreshToken,
      });
    } catch (error: any) {
      return new GraphQLYogaError(error.message);
    }
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
