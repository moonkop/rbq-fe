import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import React, {Component} from "react";

let id = 1;

interface Todo {
	title: string,
	id: number,
	finished: boolean,
}

class TodoList {
	@observable todos: Todo[] = []

	@computed get unfinishedTodoCount() {
		return this.todos.filter(todo => !todo.finished).length
	}

	addTodo(text: string) {
		this.todos.push({finished: false, id: ++id, title: text})
	}
}

export const store = new TodoList()

interface TodoListViewProps {
	todoList: TodoList
}

interface TodoListViewStates {
	inputValue: string
}

@observer
export class TodoListView extends Component<TodoListViewProps, TodoListViewStates> {
	state = {
		inputValue: '2',
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.inputValue} onChange={(value) => {
					this.setState({inputValue: value.target.value})
				}}/>
				<button onClick={() => {
					this.props.todoList.addTodo(this.state.inputValue);
					this.setState({inputValue: ''})
				}}>
					add
				</button>
				<ul>
					{this.props.todoList.todos.map(todo => (
						<TodoView todo={todo} key={todo.id}/>
					))}
				</ul>
				Tasks left: {this.props.todoList.unfinishedTodoCount}

			</div>
		)
	}
}

const Todo: React.FC<{ todo: Todo }> = (props: { todo: Todo }) => {
	const {todo} = props;
	return <li>
		<div>
			id:{todo.id}
		</div>
		<input
			type="checkbox"
			checked={todo.finished}
			onClick={() => {
				return (todo.finished = !todo.finished);
			}}
		/>
		{todo.title}
		<button onClick={() => {
			todo.title = prompt('请输入修改后的内容1') as string;
		}}>edit
		</button>
		<button onClick={() => {
			store.todos = store.todos.filter(item => item.id != todo.id);
		}}>
			delete
		</button>
	</li>
}
const TodoView = observer(Todo)
export default TodoListView;


export const TodoPage: React.FC = () => <React.Fragment>
	<TodoListView todoList={store}>
	</TodoListView>
</React.Fragment>;