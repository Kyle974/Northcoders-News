// converts JavaScript timestamp into PostgresSQL timestamptz format

const reformatTimestamp = (dataArray) => {
  reformattedDataArray = [...dataArray];
  for (let i = 0; i < reformattedDataArray.length; i++) {
    reformattedDataArray[i].created_at = new Date(
      reformattedDataArray[i].created_at
    ).toUTCString();
  }
  return reformattedDataArray;
};

module.exports = { reformatTimestamp };
