import React from 'react'
import {RootStore} from "../stores";
import {inject, observer} from "mobx-react";
import {navigateTo} from "../history";
import {Edit} from "../pages/Edit";
import {User} from "../stores/User";




interface NavbarProps {

}
interface NavbarInjectedProps extends NavbarProps{
	user:User
}
@inject((rootStore: RootStore) => ({
	user: rootStore.user
}))
@observer
export class Navbar extends React.Component<NavbarProps> {
	get injected(){
		return this.props  as NavbarInjectedProps
	}
	componentDidMount() {
		this.injected.user.getLoginUser();
	}

	render() {
		return <div className="page-top animated fadeInDown">
			<div className="nav">
				<div className="nav-links">
					<div className="nav-link" onClick={navigateTo.bind(null, '/')}>Home</div>
					<div className="nav-link" onClick={navigateTo.bind(null, '/about')}>About</div>
				</div>
			</div>
			<div className="information">
				{/*<div className="avatar"><img src=""/>*/}
				{/*</div>*/}
				{this.injected.user.name==""?<div className="login" onClick={navigateTo.bind(null,'/login')}>
					Who are you?
				</div>:<div className="login">
					{this.injected.user.name}
				</div>}
			</div>
		</div>;
	}
}

