import React from 'react';
import ReactDOM from 'react-dom';

import A from '../../core/components/a/a';
import B from '../../core/components/b/b';

import './app1.scss';

ReactDOM.render(
  <div className="app1">
    <h1>App 1</h1>
    <A />
    <B />
  </div>
, document.getElementById('app'));
