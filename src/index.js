import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

// importing components from react-router-dom package
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
//using lazy loading to load components when they are needed to increase performance
const PreviewData = React.lazy(()=> import ('./CompleteData/PreviewData')) ;
const ViewSelectQuery = React.lazy(()=> import('./CheckDuplicates/ViewSelectQuery'));
const ViewFinalQueries = React.lazy(()=>import('./FinalQueries/ViewFinalQueries'));


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
 
    <BrowserRouter>
     <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        <Route index element={<App />} />
        <Route path="PreviewData" element={<PreviewData />} />
        <Route path="ViewSelectQuery" element={<ViewSelectQuery />} />
        <Route path="ViewFinalQueries" element={<ViewFinalQueries />} />
      </Routes>
      </Suspense>
    </BrowserRouter>
 
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();