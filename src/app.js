import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Match, Miss, Link} from 'react-router';

import A from './components/a';
import B from './components/b';
import C from './components/c';

const Nav = () => (
  <div style={{marginBottom: 20}}>
    <Link to="/">Home</Link> | <Link to="/a">A</Link> | <Link to="/b">B</Link> | <Link to="/c">C</Link>
  </div>
);
const Home = () => <div>Home</div>;
const Err404 = () => <div>404 - Page Not Found</div>;

const App = () => (
  <BrowserRouter>
    <div>
      <Nav />
      <Match exactly pattern="/" component={Home} />
      <Match pattern="/a" component={A} />
      <Match pattern="/b" component={B} />
      <Match pattern="/c" component={C} />
      <Miss component={Err404} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
