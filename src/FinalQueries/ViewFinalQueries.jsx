import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import '../styles.scss';

let finalQueries = JSON.parse(localStorage.getItem('finalQueries'));
export default function ViewFinalQueries() {
  let queries = '';
  useEffect(() => {
    finalQueries = JSON.parse(localStorage.getItem('finalQueries'));
  });
  if (!window.location.hash) {
    window.location = window.location + '#loaded';
    window.location.reload();
  }

  for (let query in finalQueries) {
    queries = queries + finalQueries[query] + '\n';
  }

  const [copy_Btn_Text, set_Copy_Btn_Text] = useState('COPY');

  const handleOnCopy = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(queries);
    set_Copy_Btn_Text('COPIED');
    document.getElementById('copy-btn').style = 'background-color:#010a14;';
  };
  const navigate = useNavigate();
  //if Generate More Queries is clicked reroute app to home page for query generation
  function handleOnClick() {
    navigate('/', { replace: true });
  }

  //html page template
  return (
    <HelmetProvider>
      <div>
        <div className="previewData-container">
          <Helmet>
            <title>View-Final-Queries</title>
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
          <div id="query">{showFinalQueries()}</div>
        </div>
        <br />
        <div className="Footer-Div">
          <input
            id="gen-btn"
            type="button"
            className="gen-btn btn btn-success rounded-pill preview"
            value="Generate More Queries"
            onClick={handleOnClick}
          />
        </div>
      </div>
    </HelmetProvider>
  );
}

function showFinalQueries() {
  return finalQueries.map((finalquery, index) => {
    return (
      <div key={index}>
        <div>{finalquery}</div>
        <hr />
      </div>
    );
  });
}
