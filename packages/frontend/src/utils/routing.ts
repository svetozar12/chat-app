import { ICtx } from './auth';

const redirectTo = (redirectURL: string, ctx: ICtx, prevPath?: string) => ({
  redirect: {
    destination: `${prevPath ? `${redirectURL}?callback=${prevPath}` : redirectURL}`,
    permanent: false,
  },
});

export default redirectTo;
