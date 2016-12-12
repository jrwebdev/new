import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
  name: string,
  age?: number|string
}

const Hello = ({name, age}: Props) => <span>Hello {name}{age ? `, ${age}` : ''}!</span>;

/*
class Hello extends React.Component<Props, {}> {
  render() {
    const {name, age} = this.props;
    return <span>Hello {name}{age ? `, ${age}` : ''}!</span>;
  }
}
*/

export default Hello;
