import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import "./App.scss";
import { GenerateCompleteData } from "./CompleteData/GenerateCompeletData";
import { HelmetProvider, Helmet } from "react-helmet-async";
import TopBar from "./About/TopBar";

export default function App() {
  //for navigating to another page
  const navigate = useNavigate();
  var json = null;
  localStorage.clear();
  const [tablename, setTablename] = useState("");
  const [showLinkRadio , setShowLinkRadio] = useState(true);
  /*getting the values of selectedradio buttons and storing in state*/
  const [queryType, setQueryType] = useState();
  const [typeOfUpdate, setTypeOfUpdate] = useState();

  //set queryType as Insert/Update
  const onQueryTypeChange = (e) => {
    document.getElementsByName("queryType").checked = false;
    if(e.target.value==='Insert'){
      setShowLinkRadio(true);
    }
    else{
      setShowLinkRadio(false);
    }
    setQueryType({
      selectedOption: e.target.value,
    });
  };
  //state variables that makes asset_group_ID and Sequence_Num feilds visible or not based on type of asset updates selected
  const [asset_group_ID, show_asset_group_ID] = useState(false);
  const [Sequence_Num, show_Sequence_Num] = useState(false);
  //set typeOfUpdate as TEXT/ASSET

  const onTypeOfQueryChange = (e) => {
    setTypeOfUpdate({
      selectedOption: e.target.value,
    });
    // below code will add more required input feilds if the typeofUpdate is Asset
    if (e.target.value === "ASSET") {
      setTablename("ASSETGROUPINSTANCEASSETS");
      if (queryType.selectedOption === "Insert") {
        show_asset_group_ID(true);
        show_Sequence_Num(true);
        document.getElementById("container").classList.add("more-margin");
      } else {
        show_asset_group_ID(true);
        show_Sequence_Num(false);
        document.getElementById("container").classList.add("more-margin");
      }
    } else {
      document.getElementById("container").classList.remove("more-margin");
      show_asset_group_ID(false);
      show_Sequence_Num(false);
      if (e.target.value === "TEXT") {
        setTablename("BASE_TX");
      } else {
        setTablename("BASE_LINK");
      }
    }
  };
  //handle the uploaded excel data file
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      //convertingexcel data to JSON format
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        //storingthejsonobject in localstorage of web browser to access it anytime in browser
        localStorage.setItem("myData", JSON.stringify(json));
        if (typeOfUpdate.selectedOption === "LINK") {
          const sheetName = workbook.SheetNames[1];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          localStorage.setItem("lrsData", JSON.stringify(json));
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  //operation to be done on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("TableName", tablename);
    const email = e.target.mail_id.value;
    const BGDticket = e.target.ticket_id.value;
    localStorage.setItem("BGDticketNumber", BGDticket);
    if (typeOfUpdate.selectedOption === "ASSET") {
      if (queryType.selectedOption === "Insert") {
        localStorage.setItem(
          "asset_groupID",
          document.getElementById("asset_groupID").value
        );
        localStorage.setItem(
          "Sequence_Num",
          document.getElementById("Sequence_Number").value
        );
      } else {
        localStorage.setItem(
          "asset_groupID",
          document.getElementById("asset_groupID").value
        );
      }
      document.getElementById("container").style.marginBlockStart = '4rem';
    }
    GenerateCompleteData(queryType, tablename, email);
    navigate("/PreviewData", { replace: true });
  };

  //HTML page code of homepage
  return (
    <>
    <TopBar />
      <br />
   
    <HelmetProvider>
      
      <div className="main-container" id="container">
        <Helmet>
          <title>Upoint Query Replicator</title>
          <meta
            name="description"
            content="Home page of Upoint Query Replicator"
          />
          <meta name="theme-color" content="#008f68" />
          <link rel="manifest" href="/manifest.json" />
          <style>{"body { background-color: #010a14;}"}</style>
        </Helmet>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input-label">Select the type of query: </label>
            <br />
            <label>
              <input
                name="queryType"
                type="radio"
                value="Insert"
                onChange={onQueryTypeChange}
                required={true}
              />
              &nbsp; &nbsp;INSERT &nbsp; &nbsp;
            </label>
            <label>
              <input
                name="queryType"
                type="radio"
                value="Update"
                onChange={onQueryTypeChange}
              />
              &nbsp; &nbsp;UPDATE &nbsp; &nbsp;
            </label>
          </div>
          <div>
            <label className="input-label">
              Select the type of Data Update:{" "}
            </label>
            <br />
            <label>
              <input
                name="typeOfUpdate"
                type="radio"
                value="TEXT"
                onChange={onTypeOfQueryChange}
                required={true}
              />
              &nbsp; &nbsp;TEXT &nbsp; &nbsp;
            </label>
            <label>
              <input
                name="typeOfUpdate"
                type="radio"
                value="ASSET"
                onChange={onTypeOfQueryChange}
              />
              &nbsp; &nbsp;ASSET &nbsp; &nbsp;
            </label>
            {showLinkRadio && <label>
              <input
                name="typeOfUpdate"
                type="radio"
                value="LINK"
                onChange={onTypeOfQueryChange}
              />
              &nbsp; &nbsp;LINK &nbsp; &nbsp;
            </label>}
          </div>

          {
            //if asset_group_ID is true then this feild will be visible in input form
            asset_group_ID && (
              <div className="asset_group_ID" id="asset_group_ID">
                <label htmlFor="asset_groupID" className="input-label">
                  Eneter the asset group ID:
                </label>
                <input
                  type="text"
                  name="asset_groupID"
                  id="asset_groupID"
                  className="form-control"
                  placeholder="Eneter the asset group ID"
                  required={true}
                />
              </div>
            )
          }
          {
            //if Sequence_Num is true then this feild will be visible in input form
            Sequence_Num && (
              <div className="Sequence_Num" id="Sequence_Num">
                <label htmlFor="Sequence_Number" className="input-label">
                  Eneter the Last Sequence Number:
                </label>
                <input
                  type="text"
                  name="Sequence_Number"
                  id="Sequence_Number"
                  className="form-control"
                  placeholder="Eneter the Last Sequence Number of Asset Group"
                  required={true}
                />
              </div>
            )
          }
          <div>
            <label htmlFor="data-file" className="input-label">
              Select the file with the data:
            </label>
            <input
              type="file"
              name="data-file"
              className="form-control data-file"
              id="data-file"
              accept=".xlsx, .xls, .csv"
              onChange={readUploadFile}
              required={true}
            />
          </div>

          <div>
            <label htmlFor="mail_id" className="input-label">
              Enter alight Mail ID:
            </label>
            <input
              type="email"
              name="mail_id"
              id="mail_id"
              className="form-control"
              placeholder="name@alight.com"
              required={true}
            />
          </div>
          <div>
            <label htmlFor="ticket_id" className="input-label">
              Eneter JIRA Ticket Number:
            </label>
            <input
              type="text"
              name="ticket_id"
              id="ticket_id"
              className="form-control"
              placeholder="BGD-0000"
              required={true}
            />
          </div>
          <input
            type="submit"
            id="submit"
            value="SUBMIT"
            className="gen-btn btn btn-outline-success rounded-pill preview"
          />
        </form>
      </div>
    </HelmetProvider>
    </>
  );
}
