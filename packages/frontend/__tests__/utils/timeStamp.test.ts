import timeStamp from "../../src/utils/timeStamp";

describe("runs function timeStamp()", () => {
  it("Running the function with valid input", () => {
    const result = timeStamp("2021-11-19T07:58:23.137Z");
    expect(result).toBe("09:58");
  });
  it("Running the function with invalid input", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const result = timeStamp(true);
    expect(result).toBe("Bad input");
  });
});
