import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom for active link styling
import './NavbarStyles.css'; // Import the CSS file for styling
import Image from '../assets/logo.jpeg'; // Import the logo image

const Navbar = () => {
  return (
    <div>
		{/* Navigation bar */}
		<nav className="navbar background">
			<div className='logo'>
				{/* Logo */}
				<img src={Image} alt="Logo" />
				{/* NavLink for Home */}
				<NavLink exact to='/' activeClassName="active"><h1>SCAMSECURE</h1></NavLink>
			</div>
			{/* Navigation links list */}
			<ul className="nav-list">
				{/* NavLink for Home */}
				<li>
					<NavLink exact to='/' activeClassName="active">Home</NavLink>
				</li>
				{/* NavLink for Detect Scam */}
				<li>
					<NavLink to='/detectscam' activeClassName="active">Detect Scam</NavLink>
				</li>
				{/* NavLink for Help & Support */}
				<li>
					<NavLink to='/helpsupport' activeClassName="active">Help & Support</NavLink>
				</li>
				{/* NavLink for ScamQuiz */}
				<li>
					<NavLink to='/scamquiz' activeClassName="active">Scam Quiz</NavLink>
				</li>
				<li>
					<NavLink to='/scamtrends' activeClassName="active">Scam Trends</NavLink>
				</li>
			</ul>
		</nav>
    </div>
  );
};

export default Navbar;
