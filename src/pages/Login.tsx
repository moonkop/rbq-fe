import React, {ChangeEvent, ChangeEventHandler, MouseEventHandler} from "react";
import {computed, observable} from "mobx";

export const LoginPage: React.FC = () => {
	return <div className='page-login'>
		<Login/>
	</div>
}

class LoginStore {
	@observable name: string = ''

}

const Login: React.FC = () => {
	const [inputValue, setInputValue] = React.useState('');

	return <div>
		<div>
			<p>
				(这里有很多不可告人的秘密)
			</p>
			<p>
				来吧告诉我你是哪只？（或者我怎么称呼你？）
			</p>
		</div>
		<input type="text" className='input-main' value={inputValue}
		       onChange={(event: ChangeEvent<HTMLInputElement>) => {
			       setInputValue(event.target.value);
		       }
		       }/>
		<div>你输入的是{inputValue}</div>
		<button className='login-button' onClick={()=>{

		}}>
			我要进去！
		</button>
		<div>
			（不同的人进去看到的东西也不一样哦
		</div>
	</div>;
}
// export class Login extends React.Component<any, any> {
// 	componentWillMount() {
//
// 	}
//
// 	render() {
// 		return <div>
// 			<div>
// 				<p>
// 					(这里有很多不可告人的秘密)
// 				</p>
// 				<p>
// 					来吧告诉我你是哪只？（或者我怎么称呼你？）
// 				</p>
// 			</div>
// 			<input type="text" className='input-main' onChange={this.handleInput}/>
// 			<button className='login-button' onClick={this.handleSubmit}>
// 				我要进去！
// 			</button>
// 			<div>
// 				（不同的人进去看到的东西也不一样哦
// 			</div>
// 		</div>
// 	}
//
// 	private handleSubmit() {
//
// 	}
//
// 	private handleInput(event: React.ChangeEvent<HTMLInputElement>) {
//
// 	}
// }