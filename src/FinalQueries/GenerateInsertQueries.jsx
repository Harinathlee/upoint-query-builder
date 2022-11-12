export function GenerateInsertQueries(
  tableName,
  completeData,
  finalQuery,
  finalQueries
) {
  console.log("tablename"+tableName)
  //finalQueries = JSON.parse(localStorage.getItem('finalQueries'));
  let columns = '';
  let values = '';
  //loop to access each data object(row) from complete data
  for (let index = 0; index < completeData.length; index++) {
     finalQuery = "Insert into CL0150GTU_BASE."+tableName;
    const element = completeData[index];
    let columnNames = Object.keys(element);
    //loop to access each element (column) from the data object
    for (let i = 1; i < columnNames.length; i++) {
      const colname = columnNames[i];
      const value = element[colname];
      columns = columns + colname + ',';
      if (
        typeof value == 'number' ||
        (typeof value == 'string' && colname.includes('DT')) ||
        value === 'null'
      ) {
        values = values + value + ',';
      } else {
        values = values + "'" + value + "',";
      }
    }
    // remove the unwanted extra comma (,) from the query
    columns = columns.slice(0, columns.length - 1);
    values = values.slice(0, values.length - 1);
    finalQuery = finalQuery +' ('+ columns + ') VALUES (' + values + ');';
    // make columns and values string empty for new values
    columns = '';
    values = '';
    //push the queries to finalQueries array
    finalQueries.push(finalQuery);
  }
  //add the finalQueries JSON array to local storage of browser
 return finalQueries;
}
