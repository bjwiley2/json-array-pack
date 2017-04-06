module.exports = function () {

  let currentKey = "a";
  let cKeyDValue = {};
  let dKeyCValue = {};

  const incrementChar = (c) => {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  };

  const mapKey = (dKey) => {
    const previouslyMapped = dKeyCValue[dKey];

    if(previouslyMapped) {
      return previouslyMapped;
    }

    const cKey = currentKey;
    currentKey = incrementChar(currentKey);
    cKeyDValue[cKey] = dKey;
    dKeyCValue[dKey] = cKey;

    return cKey;
  };

  const getCompressedKey = (dKey) => {
    return dKeyCValue[dKey];
  };

  const getDecompressedKey = (cKey) => {
    return cKeyDValue[cKey];
  };

  const getMapAndReset = () => {
    const map = cKeyDValue;
    reset();
    return map;
  };

  const reset = () => {
    currentKey = "a";
    cKeyDValue = {};
    dKeyCValue = {};
  };

  return {
    getCompressedKey,
    getDecompressedKey,
    mapKey,
    getMapAndReset
  };

};
