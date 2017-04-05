module.exports = function () {

  let currentKey = "a";

  const cKeyDValue = {};
  const dKeyCValue = {};

  const incrementChar = function (c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  };

  const mapKey = function (dKey) {
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

  const getCompressedKey = function (dKey) {
    return dKeyCValue[dKey];
  };

  const getDecompressedKey = function (cKey) {
    return cKeyDValue[cKey];
  };

  const getMap = () => {
    return cKeyDValue;
  };

  return {
    getCompressedKey,
    getDecompressedKey,
    mapKey,
    getMap
  };

};
