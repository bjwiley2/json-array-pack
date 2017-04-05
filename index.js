module.exports = function () {

  const KeyMapper = require("./keyMapper.js");
  const mapper = new KeyMapper();

  const decompressObject = (item, map) => {
    const bigObj = {};

    for(let cKey in item) {
      let dKey = map[cKey];
      let value = item[cKey];

      if(Array.isArray(value)) {
        for(let index in value) {
          value[index] = decompressObject(value[index], map);
        }
      }
      else if(typeof value === "object") {
        value = decompressObject(value, map);
      }

      bigObj[dKey] = value;
    }

    return bigObj;
  };

  const compressObject = (item) => {
    const smallObj = {};

    for(let dKey in item) {
      let cKey = mapper.mapKey(dKey);
      let value = item[dKey];

      if(Array.isArray(value)) {
        for(let index in value) {
          value[index] = compressObject(value[index]);
        }
      }
      else if(typeof value === "object") {
        value = compressObject(value);
      }

      smallObj[cKey] = value;
    }

    return smallObj;
  };

  const compress = (original) => {
    if(!Array.isArray(original)) {
      throw new Error("Data must be an array");
    }

    const compressed = original.map(compressObject);

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

    return compressed.map((item) => { return decompressObject(item, map); });
  };

  const isCompressed = (data) => {
    return data &&
      !Array.isArray(data) &&
      data.map &&
      data.compressed;
  };

  return {
    decompress,
    compress,
    isCompressed
  };

};
