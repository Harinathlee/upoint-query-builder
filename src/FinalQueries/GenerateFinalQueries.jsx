import { GenerateSelectQuery } from "../CheckDuplicates/GenerateSelectQuery";
import { GenerateUpdateQueries } from "../FinalQueries/GenerateUpdateQueries";
import { GenerateInsertQueries } from "../FinalQueries/GenerateInsertQueries";
export function GenerateFinalQueries(queryType, tableName) {
  let completeData = JSON.parse(localStorage.getItem("CompleteData"));
  let finalQuery = "";
  let finalQueries = [];
  let tempArray = [];
  let querytype = queryType.selectedOption;
  // if we are trying to insert new items this will execute
  if (querytype === "Insert") {
    //gives query to check duplicates
    GenerateSelectQuery(tableName);
    //queries for LINK
    if (tableName.includes("LINK")) {
      tempArray = GenerateInsertQueries(
        tableName,
        completeData,
        finalQuery,
        finalQueries
      );
      finalQueries.concat(tempArray);
      //queries for LRS_ATTRIBUTE
      tableName = "LRS_ATTRIBUTE";
      let lrsAtrtributeData = JSON.parse(
        localStorage.getItem("lrsAtrtributeData")
      );
      tempArray = GenerateInsertQueries(
        tableName,
        lrsAtrtributeData,
        finalQuery,
        finalQueries
      );
      finalQueries.concat(tempArray);
      //queries for LRS_ATTRIBUTE
      let linkAttributeData = JSON.parse(
        localStorage.getItem("linkAttributeData")
      );
      //queries for LINK_ATTRIBUTE
      tableName = "LINK_ATTRIBUTE";
      tempArray = GenerateInsertQueries(
        tableName,
        linkAttributeData,
        finalQuery,
        finalQueries
      );
      finalQueries.concat(tempArray);
    }
    //if the type of data we are inserting is assets
    else if (tableName.includes("ASSET")) {
      const element = completeData[0];
      let email = element["LST_UPD_BY"];
      let date = element["LST_UPD_DT"];
      let assetGrpID = element["ASSETGROUP_ID"];
      finalQuery =
        "Update CL0150GTU_BASE.ASSETGROUP Set LST_UPD_BY='" +
        email +
        "',LST_UPD_DT='" +
        date +
        "' where ID='" +
        assetGrpID +
        "';";
      finalQueries.push(finalQuery);
      tempArray = GenerateInsertQueries(
        tableName,
        completeData,
        finalQuery,
        finalQueries
      );
      finalQueries.concat(tempArray);
    } else {
      tempArray = GenerateInsertQueries(
        tableName,
        completeData,
        finalQuery,
        finalQueries
      );
      finalQueries.concat(tempArray);
    }
    localStorage.setItem("finalQueries", JSON.stringify(finalQueries));
    //if type of update is insert check for duplicates by generating select query
  }

  //if query type is update
  else {
    //if the type of data we are updating is assets
     if (tableName.includes("ASSET")){
      const element = completeData[0];
      let email = element["LST_UPD_BY"];
      let date = element["LST_UPD_DT"];
      let assetGrpID = element["ASSETGROUP_ID"];
      finalQuery =
        "Update CL0150GTU_BASE.ASSETGROUP Set LST_UPD_BY='" +
        email +
        "',LST_UPD_DT='" +
        date +
        "' where ID='" +
        assetGrpID +
        "';";
      finalQueries.concat(finalQuery);
      //add the finalQueries JSON array to local storage of browser
      localStorage.setItem("finalQueries", JSON.stringify(finalQueries));
    }
    
    GenerateUpdateQueries(tableName, completeData, finalQuery, finalQueries);
  }
}
