const expect = require("expect");
const packer = require("./index.js");

describe("Packer", () => {
  it("should be an object", () => {
    expect(packer).toBeAn("object");
  });

  it("should have a compressor", () => {
    expect(packer.compress).toBeA("function");
  });

  it("should have a decompressor", () => {
    expect(packer.decompress).toBeA("function");
  });
});

const getJsonObject = () => {
  return [
    { number: 1, text: "111", bool: false },
    { number: 2, text: "222", bool: true },
    { number: 3, text: "333", bool: false },
    { number: 4, text: "444", bool: true }
  ];
};

describe("Compressor", () => {
  it("should compress", () => {
    const cJson = packer.compress(getJsonObject());
    expect(cJson).toBeAn("object");
    expect(cJson.map).toBeAn("object");
    expect(cJson.compressed).toBeAn("array");
  });
});

describe("Compressor and decompressor", () => {
  it("should return original values", () => {
    const original = getJsonObject();
    const cJson = packer.compress(original);
    const dJson = packer.decompress(cJson);
    expect(dJson).toBeAn("array");
    expect(dJson.length).toBe(original.length);
    expect(dJson).toEqual(original);
  });
});
