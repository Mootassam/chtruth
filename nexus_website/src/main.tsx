import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { i18n, init as i18nInit } from './i18n';

(async function () {


  document.title = 'Nexus Exchange';
  ReactDOM.render(<App />, document.getElementById('root'));
})();
