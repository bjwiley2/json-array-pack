const expect = require("expect");
const ArrayPack = require("./index.js");

const packer = new ArrayPack();

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

const getNestedJsonObject = () => {
  return [
    {
      number: 1,
      text: "111",
      bool: false,
      sub: {
        numberSub: 11,
        text: "1111",
        sub: {
          numberSub2: 11,
          text: "1111"
        }
      }
    },
    {
      number: 2,
      text: "222",
      bool: true,
      sub: {
        numberSub: 22,
        text: "2222",
        sub: {
          numberSub2: 22,
          text: "2222"
        }
      }
    },
    {
      number: 3,
      text: "333",
      bool: false,
      sub: getJsonObject()
    },
    {
      number: 4,
      text: "444",
      bool: true,
      sub: {
        numberSub: 44,
        text: "4444",
        sub: {
          numberSub2: 44,
          text: "4444"
        }
      }
    }
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

  it("should return original values for nested object", () => {
    const original = getNestedJsonObject();
    const cJson = packer.compress(original);
    const dJson = packer.decompress(cJson);
    expect(dJson).toBeAn("array");
    expect(dJson.length).toBe(original.length);
    expect(dJson).toEqual(original);
  });
});
