import React from "react";
import {inject} from "mobx-react";
import {RootStore} from "../stores";
import {User} from "../stores/User"

interface LoginProps {

}

interface LoginState {
	name: string;
}

interface LoginInjectedProps extends LoginProps {
	login: User
}

@inject((stores: RootStore) => ({
	login: stores.user
}))
export class Login extends React.Component<LoginProps, LoginState> {
	state = {
		name: ''
	}

	get injected() {
		return this.props as LoginInjectedProps;
	}

	handleLogin = () => {
		this.injected.login.login(this.state.name);
	};

	render() {

		return <div>
			<div>
				<p>
					(这里有很多不可告人的秘密)
				</p>
				<p>
					来吧告诉我你是哪只？（或者我怎么称呼你？）
				</p>
			</div>
			<input type="text" className='input-main' value={this.state.name}
			       onChange={(e) => {
				       this.setState({name: e.target.value})
			       }}/>

			<button className='btn btn-login' onClick={this.handleLogin}>
				出发~
			</button>
			<div>
				（不同的人进去看到的东西也不一样哦
			</div>
		</div>;
	}
}