const tryCatchWrapper =
  <Z>(executable: () => Z) =>
  async <G>(...args: G[]) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await executable(...args);
      return result;
    } catch (error) {
      throw error;
    }
  };

export default tryCatchWrapper;
