import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter, Match, Miss, Link} from 'react-router';

System.import('./util/hello').then(module => {
  module.default();
});

// import A from './components/a';
// import B from './components/b';
// import C from './components/c';

const asyncComponent = loadComponent => {

  let Component;

  return class AsyncComponent extends React.Component {

    state = {
      loaded: false
    };

    componentWillMount() {
      loadComponent().then(LoadedComponent => {
        Component = LoadedComponent;
        this.setState({loaded: true});
      });
    }

    render() {
      return this.state.loaded ? <Component /> : <div>Loading...</div>;
    }

  };

};

const Nav = () => (
  <div style={{marginBottom: 20}}>
    <Link to="/">Home</Link> | <Link to="/a">A</Link> | <Link to="/b">B</Link> | <Link to="/c">C</Link>
  </div>
);
const Home = () => <div>Home</div>;
const Err404 = () => <div>404 - Page Not Found</div>;

const getDefault = module => module.default;
const AsyncA = asyncComponent(() => System.import('./components/a').then(getDefault));
const AsyncB = asyncComponent(() => System.import('./components/b').then(getDefault));
const AsyncC = asyncComponent(() => System.import('./components/c').then(getDefault));

const App = () => (
  <BrowserRouter>
    <div>
      <Nav />
      <Match exactly pattern="/" component={Home} />
      <Match pattern="/a" component={AsyncA} />
      <Match pattern="/b" component={AsyncB} />
      <Match pattern="/c" component={AsyncC} />
      <Miss component={Err404} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
