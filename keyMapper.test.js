const expect = require("expect");
const KeyMapper = require("./keyMapper.js");

const mapper = new KeyMapper();

describe("Mapper", () => {
  it("should be an object", () => {
    expect(mapper).toBeAn("object");
  });

  it("should have a getCompressedKey", () => {
    expect(mapper.getCompressedKey).toBeA("function");
  });

  it("should have a getDecompressedKey", () => {
    expect(mapper.getDecompressedKey).toBeA("function");
  });

  it("should have a mapKey", () => {
    expect(mapper.mapKey).toBeA("function");
  });

  it("should have a getMap", () => {
    expect(mapper.getMapAndReset).toBeA("function");
  });

  it("should map keys", () => {
    const dKey1 = "banana";
    const dKey2 = "orange";
    const dKey3 = "apple";

    const cKey1 = mapper.mapKey(dKey1);
    const cKey2 = mapper.mapKey(dKey2);
    const cKey3 = mapper.mapKey(dKey3);

    expect(cKey1).toNotEqual(cKey2);
    expect(cKey1).toNotEqual(cKey3);
    expect(cKey2).toNotEqual(cKey3);

    expect(dKey1).toEqual(mapper.getDecompressedKey(cKey1));
    expect(dKey2).toEqual(mapper.getDecompressedKey(cKey2));
    expect(dKey3).toEqual(mapper.getDecompressedKey(cKey3));

    expect(cKey1).toEqual(mapper.getCompressedKey(dKey1));
    expect(cKey2).toEqual(mapper.getCompressedKey(dKey2));
    expect(cKey3).toEqual(mapper.getCompressedKey(dKey3));

    const map = mapper.getMapAndReset();
    expect(Object.keys(map).length).toEqual(3);

    expect(map[cKey1]).toEqual(dKey1);
    expect(map[cKey2]).toEqual(dKey2);
    expect(map[cKey3]).toEqual(dKey3);
  });

  it("should map keys twice", () => {
    const dKey1 = "banana";
    const dKey2 = "orange";
    const dKey3 = "apple";

    const cKey1 = mapper.mapKey(dKey1);
    const cKey2 = mapper.mapKey(dKey2);
    const cKey3 = mapper.mapKey(dKey3);

    expect(cKey1).toNotEqual(cKey2);
    expect(cKey1).toNotEqual(cKey3);
    expect(cKey2).toNotEqual(cKey3);

    expect(dKey1).toEqual(mapper.getDecompressedKey(cKey1));
    expect(dKey2).toEqual(mapper.getDecompressedKey(cKey2));
    expect(dKey3).toEqual(mapper.getDecompressedKey(cKey3));

    expect(cKey1).toEqual(mapper.getCompressedKey(dKey1));
    expect(cKey2).toEqual(mapper.getCompressedKey(dKey2));
    expect(cKey3).toEqual(mapper.getCompressedKey(dKey3));

    const map = mapper.getMapAndReset();
    expect(Object.keys(map).length).toEqual(3);

    expect(map[cKey1]).toEqual(dKey1);
    expect(map[cKey2]).toEqual(dKey2);
    expect(map[cKey3]).toEqual(dKey3);

    const dKey4 = "banana";
    const cKey4 = mapper.mapKey(dKey4);

    expect(dKey4).toEqual(mapper.getDecompressedKey(cKey4));
    expect(cKey4).toEqual(mapper.getCompressedKey(dKey4));

    const map2 = mapper.getMapAndReset();
    expect(Object.keys(map2).length).toEqual(1);

    expect(map2[cKey4]).toEqual(dKey4);
  });
});
