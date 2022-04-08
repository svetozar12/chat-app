export const isAuth = (user: string) => {
  if (!user || user === "") {
    throw new Error("Not authenticated/authorized");
  }
  return true;
};
