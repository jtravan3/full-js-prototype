import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import data from './testData';

ReactDOM.render(
    <App initialData={window.initialData}/>,
    document.getElementById('root')
);


