import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<nav className="header">
			<ul>
				<li>
					<NavLink className="header-link" to="/" end>
						Products
					</NavLink>
				</li>
				<li>
					<NavLink className="header-link" to="contact">
						Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Header;
