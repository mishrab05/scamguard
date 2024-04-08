import React from 'react'
import {Link} from 'react-router-dom'
import './NavbarStyles.css'
import Image from '../assets/logo.jpeg'


const Navbar = () => {
  return (
    <div>
        <nav class="navbar background">
		<div class='logo'>
			<img src={Image}/>
			<Link to='/'><h1>SCAMSECURE</h1></Link>
		</div>
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
			</ul>
		</nav>
    </div>
  )
}

export default Navbar