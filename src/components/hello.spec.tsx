import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {shallow} from 'enzyme';

import Hello from './hello';

it('should display a name', () => {
  const hello = shallow(<Hello name="James" />);
  expect(hello.text()).toContain('Hello James!');
});

it('should display an age', () => {
  const hello = shallow(<Hello name="James" age={29} />);
  expect(hello.text()).toContain('Hello James, 29!');
});