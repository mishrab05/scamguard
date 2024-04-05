import React from 'react'
import './FooterStyles.css'
import {FaFacebook, FaLinkedin, FaMailBulk, FaPhone, FaSearchLocation, FaTwitter} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer-container'>
            <div className='left'>
                <div className='location'>
                    <FaSearchLocation size={20} style={{color: '#ffffff', marginRight: '2rem'}} />
                    <div>
                        <p>New South Wales</p>
                        <h4>Australia</h4>
                    </div>
                </div>
                <div className='phone'>
                    <h4><FaPhone size={20} style={{color: '#ffffff', marginRight: '2rem'}} />04-123123</h4>
                </div>
                <div className='email'>
                    <h4><FaMailBulk size={20} style={{color: '#ffffff', marginRight: '2rem'}} /> contact@scamguard.com</h4>
                </div>
            </div>
            <div className='right'>
                <h4>Contact us</h4>
                <p>Get in touch via social media</p>
                <div className='social'>
                    <FaFacebook size={30} style={{color: '#ffffff', marginRight: '1rem'}} />
                    <FaTwitter size={30} style={{color: '#ffffff', marginRight: '1rem'}} />
                    <FaLinkedin size={30} style={{color: '#ffffff', marginRight: '1rem'}} />
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer