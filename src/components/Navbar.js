import React from 'react'
import {Link} from 'react-router-dom'
import './NavbarStyles.css'


const Navbar = () => {
  return (
    <div>
        <nav class="navbar background">
		<Link to='/'><h1>SCAM GUARD</h1></Link>
			<ul class="nav-list">
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/detectscam'>Detect Scam</Link>
				</li>
				<li>
					<Link to='/helpsupport'>Help & Support</Link>
				</li>
				<li>
					<Link to='/'>About Us</Link>
				</li>
			</ul>
		</nav>
    </div>
  )
}

export default Navbar