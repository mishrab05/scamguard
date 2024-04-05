import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from '../assets/seniors.jpeg'

const Home = () => {
  return (
    <section className='hero' style={{ backgroundImage: `url(${Image})`}}>
        <Navbar/>
        <div className='content'>
            <h1 className='centered-title'>Unsure about a suspicious message?</h1>
            <p className='centered-description'>Let's check!</p>
            <div>
                <Link to='/detectscam' className='btn'>CLICK HERE</Link>
            </div>
        </div>
        

    </section>
  );
}

export default Home;
