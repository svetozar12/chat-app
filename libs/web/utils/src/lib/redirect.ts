import { ICtx } from './auth';

export const redirectTo = (
  redirectURL: string,
  ctx: ICtx,
  prevPath?: string
) => ({
  redirect: {
    destination: `${
      prevPath && typeof prevPath === 'string'
        ? `${redirectURL}?callback=${prevPath}`
        : redirectURL
    }`,
    permanent: false,
  },
});
