import React, {ChangeEvent} from "react";

export const LoginPage: React.FC = () => {
	return <div className='page-login'>
		<Login/>
	</div>
};


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
		<button className='login-button' onClick={() => {

		}}>
			我要进去！
		</button>
		<div>
			（不同的人进去看到的东西也不一样哦
		</div>
	</div>;
};