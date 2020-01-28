import React from 'react'
import { NavLink } from 'react-router-dom'

export class Navbar extends React.Component {
	render() {
		console.log("navbar", this);
		return (
			<nav>
				<div className="nav-wrapper cyan darken-1 px1">
					<NavLink to="/" className="brand-logo">
						别惹我 我惹不起
					</NavLink>
					<ul className="right">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/about">About</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}
