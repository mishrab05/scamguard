import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import './NavbarStyles.css'

const Navbar = () => {
    const[click, setClick] = useState(false)
    const handleClick = () => setClick(!click)


  return (
    <div className='header'>
        <Link to='/'><h1>SCAM GUARD</h1></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
            <Link to='/detectscam'>Detect Scam</Link>
            </li>
            <li>
                <Link to='/help'>Help & Support</Link>
            </li>
            <li>
                <Link to='/'>About Us</Link>
            </li>
        </ul>
        <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size={20} style={{color: '#5E2D91'}}/>) : (<FaBars size={20} style={{color: '#5E2D91'}}/>)}            
        </div>
    </div>
  )
}

export default Navbar