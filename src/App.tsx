import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import {Navbar} from './components/Navbar'
import {About} from './pages/About'
import {Home} from "./pages/Home";

export class App extends React.Component {

	render() {
		return (
			<BrowserRouter>
				<Navbar/>
				<div className="container">
					<Switch>

						<Route path="/" component={Home} exact/>
						<Route path="/about" component={About}/>
						<Route path="/about" component={About}/>

					</Switch>

				</div>
			</BrowserRouter>

		)
	}
}

