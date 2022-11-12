export function GenerateUpdateQueries(
  tableName,
  completeData,
  finalQuery,
  finalQueries
) {
  let whereCondition = " where ";
  //loop to access each data object(row) from complete data
  for (let index = 0; index < completeData.length; index++) {
    finalQuery = "Update CL0150GTU_BASE." + tableName + " Set ";
    const element = completeData[index];
    let columnNames = Object.keys(element);
    //loop to access each element (column) from the data object
    for (let i = 1; i < columnNames.length; i++) {
      const colname = columnNames[i];
      const value = element[colname];
      if (colname === "NAME" || colname === "TX_NM") {
        whereCondition = whereCondition + colname + "='" + value + "' and ";
      } else if (colname === "LCLE_CD" || colname === "ASSETGROUP_ID") {
        whereCondition = whereCondition + colname + "='" + value + "'";
      } else if (typeof value === "number") {
        if (i + 1 !== columnNames.length) {
          finalQuery = finalQuery + ","+ colname + "=" + value + ",";
        } else {
          finalQuery = finalQuery +","+ colname + "=" + value + " ";
        }
      }
      //if type of update is text include last updated by and date
      else if (finalQuery.includes("BASE_TX")) {
        if (colname === "LST_UPD_DT") {
          finalQuery = finalQuery + colname + "=" + value + ",";
        } else {
          finalQuery = finalQuery + colname + "='" + value + "', ";
        }
      }
      //if type of update is Asset exclude last updated by and date
      else if (
        finalQuery.includes("ASSET") &&
        colname !== "LST_UPD_DT" &&
        colname !== "LST_UPD_BY"
      ) {
        finalQuery = finalQuery + colname + "='" + value + "', ";
      }
    }
    finalQuery.replace(",,",",");
    // remove the unwanted extra comma (,) from the query
    const lastIndexOfComma = finalQuery.lastIndexOf(",");
    finalQuery =
      finalQuery.slice(0, lastIndexOfComma) +
      finalQuery.slice(lastIndexOfComma + 1);
    // add where condition to the query
    finalQuery = finalQuery + whereCondition + ";";
    whereCondition = " where ";
    //push the queries to finalQueries array
    finalQueries.push(finalQuery);
  }
  //add the finalQueries JSON array to local storage of browser
  localStorage.setItem("finalQueries", JSON.stringify(finalQueries));
}
