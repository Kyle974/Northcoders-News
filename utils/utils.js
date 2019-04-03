// takes an array of objects as first arguement, the key of an JavaScript timestamp and converts those timestamps into PostgresSQL timestamptz format.

const reformatTimestamp = (dataArray, timestampKey) => {
  reformattedDataArray = [...dataArray];
  for (let i = 0; i < reformattedDataArray.length; i++) {
    reformattedDataArray[i][timestampKey] = new Date(
      reformattedDataArray[i][timestampKey]
    ).toUTCString();
  }
  return reformattedDataArray;
};

// takes array of objects as first arguement, the name of a key within those object as the second arguement, and the name that key is to be changed to.

const changeKeyName = (dataArray, oldKeyName, newKeyName) => {
  const newDataArray = [...dataArray];
  for (let i = 0; i < newDataArray.length; i++) {
    newDataArray[i][newKeyName] = newDataArray[i][oldKeyName];
    delete newDataArray[i][oldKeyName];
  }
  return newDataArray;
};

//

const convertData = (dataArray1, objectKey1, dataArray2, objectKey2) => {
  const convertedDataArray = [...dataArray1];
  for (let i = 0; i < convertedDataArray.length; i++) {
    const matchedData = dataArray2.find(
      (data) => data[objectKey1] === convertedDataArray[i][objectKey1]
    );
    convertedDataArray[i][objectKey2] = matchedData[objectKey2];
    delete convertedDataArray[i][objectKey1];
  }
  return convertedDataArray;
};

module.exports = { reformatTimestamp, changeKeyName, convertData };
