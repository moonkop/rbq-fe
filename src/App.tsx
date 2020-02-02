import React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {About} from './pages/About'
import {history} from "./history";
import {Login} from "./pages/Login";
import {Provider} from 'mobx-react';
import {rootStore} from './stores';
import {ArticleAdmin} from "./pages/ArticleAdmin";
import {Edit} from "./pages/Edit";
import "./styles/Anatole.scss"
import {Navbar} from "./components/Navbar";
import {Sidebar} from "./components/Sidebar";

export const App = () => (
	<Provider {...rootStore}>
		<Sidebar/>
		<Navbar/>
		<div className="autopagerize_page_element">
			<div className="content">
				<Router history={history}>
					<Switch>
						<Route path="/" component={ArticleAdmin} exact/>
						<Route path="/tags/:tag" component={ArticleAdmin}/>
						<Route path="/edit/:id" component={Edit}/>
						<Route path="/about" component={About}/>
						<Route path="/login" component={Login}/>
					</Switch>
				</Router>
			</div>
		</div>
	</Provider>


);