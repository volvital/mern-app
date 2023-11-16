import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)

	const logoutHandler = event => {
		event.preventDefault();
		auth.logout()
		navigate('/')
	}
	return (
		<nav>
			<div className="nav-wrapper indigo darken-1" style={{ padding: '0 2rem'}}>
				<span className="brand-logo left">Shorten the link</span>
				<ul id="nav-mobile" className="right">
					<li><NavLink to="/create">Create</NavLink></li>					
					<li><NavLink to="/links">Links</NavLink></li>					
					<li><a href="/" onClick={logoutHandler}>Exit</a></li>					
				</ul>
			</div>
		</nav>
	)
}