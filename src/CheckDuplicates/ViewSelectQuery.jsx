import React, { useState } from 'react';

import '../styles.scss';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function ViewSelectQuery() {
  const navigate = useNavigate();
  const selectQuery = localStorage.getItem('SelectQuery');
  const [copy_Btn_Text, set_Copy_Btn_Text] = useState('COPY');

  const handleOnCopy = () => {
    // Copy the text inside the text field

    navigator.clipboard.writeText(selectQuery);
    set_Copy_Btn_Text('COPIED');
    document.getElementById('copy-btn').style = 'background-color:#010a14;';
  };

  const [submit_Btn_Text, set_submit_Btn_Text] = useState('Resubmit the Form');
  const handleCheckBox = () => {
    if (
      !document.getElementById('checkBox').checked ||
      document.getElementById('checkBox').checked === false
    ) {
      set_submit_Btn_Text('Resubmit the Form');
    } else {
      set_submit_Btn_Text('Generate Insert Queries');
    }
  };

  const handleOnClick = () => {
    if (
      document.getElementById('checkBox').checked === true &&
      document.getElementById('gen-btn').value.includes('Generate')
    ) {
      navigate('/ViewFinalQueries', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  //html page template
  return (
    <HelmetProvider>
      <div className="previewData-container"> 
          <Helmet>
            <title>Check-Duplicates</title>
            <meta name="description" content="App Description" />
            <meta name="theme-color" content="#008f68" />
            <link rel="manifest" href="/manifest.json" />
            <style>{'body { background-color: #010a14; color:white}'}</style>
          </Helmet>
          <button
            id="copy-btn"
            className="gen-btn btn btn-success rounded-pill copy-btn"
            onClick={handleOnCopy}
          >
            {copy_Btn_Text}
          </button>
          <br />
          <p id="query">{selectQuery}</p>
        </div>
        <br />
        <div className="Footer-Div">
          <input
            type="checkbox"
            name="checkBox"
            id="checkBox"
            value="NoDuplicates"
            onChange={handleCheckBox}
          />
          <label htmlFor="checkBox">
            There are no Duplicates present in DB
          </label>
          <br />
          <input
            id="gen-btn"
            type="button"
            className="gen-btn btn btn-success rounded-pill preview"
            value={submit_Btn_Text}
            onClick={handleOnClick}
          />
        </div>
    </HelmetProvider>
  );
}
