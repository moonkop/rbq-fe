import React, {Fragment} from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import { createBrowserHistory } from "history"
import {Navbar} from './components/Navbar'
import {About} from './pages/About'
import {ArticleListPage} from "./pages/ArticleList";
import {EditPage} from "./pages/Edit";
import {history} from "./history";

export const App = () => (
	<Router history={history}>
		<Navbar/>
		<div className="container">
			<Switch>
				<Route path="/" component={ArticleListPage} exact/>
				<Route path="/edit/:name" component={EditPage}/>
				<Route path="/about" component={About}/>
			</Switch>
		</div>
	</Router>

);