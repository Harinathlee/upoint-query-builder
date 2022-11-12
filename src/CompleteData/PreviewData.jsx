import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import '../styles.scss';
let TableData = {};
let heading = [];
let defaultData = [];
export default function PreviewData() {
  defaultData = JSON.parse(localStorage.getItem('myData'));
  TableData = JSON.parse(localStorage.getItem('CompleteData'));
  let queryType = localStorage.getItem('queryType');
  heading = Object.keys(TableData[0]);
  const navigate = useNavigate();
  const [btn_Text, set_Btn_Text] = useState('Check for Duplicates');
  useEffect(() => {
    onDivLoad();
  });
  const onDivLoad = () => {
    if (queryType === 'Insert') {
      set_Btn_Text('Check for Duplicates');
    } else {
      set_Btn_Text('Generate Update Queries');
    }
  };

  function handleOnClick() {
    if (document.getElementById('gen-btn').value.includes('Generate')) {
      navigate('/ViewFinalQueries', { replace: true });
    } else {
      navigate('/ViewSelectQuery', { replace: true });
    }
  }
  
//html page template
  return (
    <HelmetProvider>
      <div className="whole-container" onLoad={onDivLoad}>
        <div className="previewData-container">
          <Helmet>
            <title>Preview-Data</title>
            <meta name="description" content="App Description" />
            <meta name="theme-color" content="#008f68" />
            <link rel="manifest" href="/manifest.json" />
            <style>{'body { background-color: #010a14; color:white}'}</style>
            <body></body>
          </Helmet>

          <TableView />
          <div>
            {TableData.length !== defaultData.length && (
              <p className="missedErrorMsg">
                {defaultData.length - TableData.length}{' '}
                {defaultData.length - TableData.length > 1
                  ? 'items are'
                  : 'item is'}{' '}
                not processed due to it has unwanted characters.{' '}
              </p>
            )}
          </div>
        </div>
        <br />
        <div className="Footer-Div">
          <input
            id="gen-btn"
            type="button"
            className="btn gen-btn btn-success rounded-pill preview"
            value={btn_Text}
            onClick={handleOnClick}
          />
        </div>
      </div>
    </HelmetProvider>
  );
}
const TableView = () => {
  // get table heading data
  const ThData = () => {
    return heading.map((data, index) => {
      return <th key={index}>{data}</th>;
    });
  };
  // get table row data

  const tdData = () => {
    return TableData.map((data, index) => {
      return (
        <tr key={index}>
          {heading.map((v, index) => {
            return <td key={index}>{data[v]}</td>;
          })}
        </tr>
      );
    });
  };
  return (
    <table className="table">
      <thead>
        <tr>{ThData()}</tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </table>
  );
};
