import React from 'react';

import Hello from './hello';

class Main extends React.Component {

  aProperty = 'ABC 123'

  render() {
    return (
      <div>
        <Hello />
      </div>
    );
  }
}

export default Main;
