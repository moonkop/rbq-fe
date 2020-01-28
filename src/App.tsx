import React from 'react'
import {Route, Router, Switch} from 'react-router-dom'
import {Navbar} from './components/Navbar'
import {About} from './pages/About'
import {ArticleListPage} from "./pages/ArticleList";
import {EditPage} from "./pages/Edit";
import {history} from "./history";
import {LoginPage} from "./pages/Login";

export const App = () => (
	<Router history={history}>
		<Navbar/>
		<div className="container">
			<Switch>
				<Route path="/" component={ArticleListPage} exact/>
				<Route path="/edit/:id" component={EditPage}/>
				<Route path="/about" component={About}/>
				<Route path="/login" component={LoginPage}/>
			</Switch>
		</div>
	</Router>

);