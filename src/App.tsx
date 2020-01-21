import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import  {TodoPage} from "./pages/todos";
import {LoginPage} from "./pages/Login";

export class App extends React.Component{
	render(){
		return (
			<BrowserRouter>
				<Navbar />
				<Switch>
					<div className="container">
						<Route path="/" component={LoginPage} exact />
						<Route path="/about" component={About} />
						<Route path="/about" component={About} />
					</div>
				</Switch>
			</BrowserRouter>
		)
	}
}

