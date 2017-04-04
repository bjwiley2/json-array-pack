const expect = require("expect");
const packer = require("./index.js");

describe("Our first test", () => {
  it("should pass", () => {
    expect(true).toEqual(true);
  });
});

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
