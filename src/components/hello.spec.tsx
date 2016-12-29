import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {shallow} from 'enzyme';

import Hello from './hello';

it('should display a name', () => {
  const hello = shallow(<Hello name="Bob" />);
  expect(hello.text()).toContain('Hello Bob!');
});

it('should display an age', () => {
  const hello = shallow(<Hello name="Bob" age={50} />);
  expect(hello.text()).toContain('Hello Bob, 50!');
});
