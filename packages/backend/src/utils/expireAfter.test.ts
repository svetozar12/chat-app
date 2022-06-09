import expireDate from "./expireAfter";

const invalidTypes = [false, true, 2, null, undefined, { i: 2 }, () => console.log("hi"), [1, 2, 3]];

describe("testing expireDate utils func", () => {
  it("valid", () => {
    const res = expireDate("2s");
    const now = new Date().getTime();
    const newDate = new Date(res as Date).getTime();
    expect((newDate - now) / 1000).toBe(2);
  });

  invalidTypes.forEach((element) => {
    it("invalid", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = expireDate(element);
      expect(res).toBe(undefined);
    });
  });
});
