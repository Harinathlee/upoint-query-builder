//Generates a select query to check whether there are any item is already in DB table to prevent duplicates
export function GenerateSelectQuery(tableName) {
  let data = JSON.parse(localStorage.getItem('CompleteData'));
  let values = '';
  let colname = '';
  if (tableName.includes('TX')) {
    colname = 'TX_NM';
  } else if (tableName.includes('ASSET')) {
    colname = 'NAME';
  } else {
    colname = 'LINK_NAME';
  }
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    //console.log('elemt' + element);
    let value = element[colname];
    //console.log(value);
    if (index !== data.length - 1) {
      values = values + "'" + value + "' ,";
    } else {
      values = values + "'" + value + "'";
    }
  }
  let selectQuery =
    'Select * from CL0150GTU_BASE.' + tableName + ' where ' + colname + ' in (' + values + ')';
  if (tableName.includes('TX')) {
    selectQuery = selectQuery + "and LCLE_CD= 'en_US';";
  } else if (tableName.includes('ASSET')) {
    selectQuery =
      selectQuery +
      "and ASSETGROUP_ID= '" +
      localStorage.getItem('asset_groupID') +
      "';";
  } else {
    selectQuery = selectQuery + ';';
  }
  localStorage.setItem('SelectQuery', selectQuery);
}
