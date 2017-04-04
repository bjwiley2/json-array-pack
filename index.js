const KeyMapper = require("./keyMapper.js");

const mapper = new KeyMapper();

const compress = (original) => {
  if(!Array.isArray(original)) {
    throw new Error("Data must be an array");
  }

  const compressed = original.map((item, index) => {
    const smallObj = {};

    for(let dKey in item) {
      let cKey = mapper.mapKey(dKey);
      smallObj[cKey] = item[dKey];
    }

    return smallObj;
  });

  return {
    map: mapper.getMap(),
    compressed
  };
};

const decompress = (compressedObj) => {
  if(!compressedObj) {
    throw new Error("Object must be defined");
  }

  const map = compressedObj.map;
  const compressed = compressedObj.compressed;

  if(!map) {
    throw new Error("Map is missing");
  }

  if(!compressed) {
    throw new Error("Compressed data is missing");
  }

  if(!Array.isArray(compressed)) {
    throw new Error("Compressed data must be an array");
  }

  return compressed.map((item, index) => {
    const bigObj = {};

    for(let cKey in item) {
      let dKey = map[cKey];
      bigObj[dKey] = item[cKey];
    }

    return bigObj;
  });
};

module.exports = {
  compress,
  decompress
};
