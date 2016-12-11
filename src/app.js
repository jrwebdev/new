import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'node-uuid';

import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

class TodoStore {

  @observable todos = [];

  @action addTodo(text) {
    this.todos.push({
      id: uuid.v4(),
      text
    });
  }

  @action removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

}

const TodoItem = ({text, onRemove}) => (
  <li>
    {text} <button type="button" onClick={onRemove}>Remove</button>
  </li>
);

TodoItem.propTypes = {
  text: React.PropTypes.string,
  onRemove: React.PropTypes.func
};


@observer
class TodoList extends React.Component {

  static propTypes = {
    store: React.PropTypes.instanceOf(TodoStore)
  }

  state = {
    newTodo: ''
  }

  updateNewTodo = (e) => {
    this.setState({newTodo: e.target.value});
  };

  addTodo = (e) => {
    e.preventDefault();
    if (this.state.newTodo.trim()) {
      this.props.store.addTodo(this.state.newTodo);
      this.setState({newTodo: ''});
    }
  };

  render() {

    const {store} = this.props;

    const todos = store.todos.map(todo => (
      <TodoItem
        key={todo.id}
        text={todo.text}
        onRemove={() => store.removeTodo(todo.id)}
      />
    ));

    return (
      <div>
        <h1>Todo List</h1>
        <form onSubmit={this.addTodo}>
          <input value={this.state.newTodo} onChange={this.updateNewTodo} /> <button>Add Todo</button>
        </form>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }

}

const store = new TodoStore();
ReactDOM.render(<TodoList store={store} />, document.getElementById('app'));
