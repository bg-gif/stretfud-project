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
