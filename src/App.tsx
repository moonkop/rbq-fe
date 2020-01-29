import React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {About} from './pages/About'
import {history} from "./history";
import {LoginPage} from "./pages/Login";
import { Provider } from 'mobx-react';
import {rootStore} from './stores';
import {ArticleList} from "./pages/ArticleList";
import {Edit} from "./pages/Edit";

export const App = () => (
	<Provider {...rootStore}>
		<Router history={history}>
			<Navbar/>
			<div className="container">
				<Switch>
					<Route path="/" component={ArticleList} exact/>
					<Route path="/edit/:id" component={Edit}/>
					<Route path="/about" component={About}/>
					<Route path="/login" component={LoginPage}/>
				</Switch>
			</div>
		</Router>
	</Provider>


);