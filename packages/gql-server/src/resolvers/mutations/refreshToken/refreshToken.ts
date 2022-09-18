import sdk from "../../../utils/sdk";

export interface IRefreshToken {
  user_id: string;
  RefreshToken: string;
}

const refreshToken = async (args: IRefreshToken) => {
  try {
    const res = await sdk.auth.refresh(args.user_id, args.RefreshToken);
    return res;
  } catch (error) {
    return error;
  }
};

export default refreshToken;
