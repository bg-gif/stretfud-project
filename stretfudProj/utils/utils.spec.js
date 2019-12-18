const { formatLocation, removeItem } = require("./utils");

describe("formatLocation", () => {
  it("given a lat and long object numbers returns a string", () => {
    const output = formatLocation({});
    expect(typeof output).toBe("string");
  });
  it("given a lat and long obj returns with the values of the keys and returns them in a string", () => {
    const output = formatLocation({ latitude: "53.1", longitude: "-1.54" });
    expect(output).toBe("53.1, -1.54");
  });
});

describe("removeItem", () => {
  it("when passed an array, returns an array", () => {
    const output = removeItem([{ name: "test" }]);
    expect(Array.isArray(output)).toBe(true);
  });
  it("when passed an array of objects and a name value, returns the array unchanged when name value not present", () => {
    const testObj = { name: "test" };
    const output = removeItem([testObj], "bleh");
    expect(testObj).toEqual({ name: "test" });
    expect(output).toEqual([{ name: "test" }]);
  });
  it("when passed an array of objects and a name value, returns an array with an object removed that matches the name value", () => {
    const testArr = [{ name: "test" }, { name: "bah" }];
    const output = removeItem(testArr, "bah");
    expect(testArr).toEqual([{ name: "test" }, { name: "bah" }]);
    expect(output).toEqual([{ name: "test" }]);
  });
  it("when passed an array of objects and a name value, returns an array with one object removed that matches the name value even if there are multiples", () => {
    const testArr = [{ name: "test" }, { name: "test" }];
    const output = removeItem(testArr, "test");
    expect(testArr).toEqual([{ name: "test" }, { name: "test" }]);
    expect(output).toEqual([{ name: "test" }]);
  });
});

describe("formatDate", () => {
  it("when passed a string, returns a string", () => {
    const output = formatDate("2018-04-16T19:29:32.774Z");
    expect(typeof output).toEqual("string");
  });
  it("when passed a date string returns the date as a string containing the day of the week, the month, the day, the year and time in", () => {
    const output = formatDate("2018-04-16T19:29:32.774Z");
    expect(output).toBe("Mon Apr 16 2018 20:29:32 GMT");
  });
  it("does not mutate original string", () => {
    const input = "2018-04-16T19:29:32.774Z";
    formatDate(input);
    expect(input).toBe("2018-04-16T19:29:32.774Z");
  });
});
