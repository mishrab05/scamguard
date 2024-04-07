import React from 'react';
import '../App.css'; 
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Image from '../assets/seniors.jpeg'


const Home = () => {
  return (
    <div>
        <section style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.45)',
        backgroundBlendMode: 'darken',
        }}>
        <Navbar/>

        <section class="content">
            <div class="box-content">
                <div class="firstHalf">
                    <h1 class="centered-title">
                        Unsure about a suspicious message?
                    </h1>
                    <p class="centered-description">
                        Let's check!
                    </p>
                    <div>
                        <Link to='/detectscam' className='btn'>CLICK HERE</Link>
                    </div>
                </div>
            </div>
			  </section>

        <div className="card-container">
            <div className="info-card">
                <div className="card-content">
                    <h2 class='card-heading'>Be scam aware</h2>
                    <p>Learn how to spot and identify scams</p>
                    <Link to="/" className="card-link-button"><a class='card-link'>Learn More</a></Link>
                </div>
            </div>
            <div className="info-card">
                <div className="card-content">
                    <h2 class='card-heading'>I've been scammed</h2>
                    <p>Act straight away</p>
                    <Link to="/helpsupport" className="card-link-button"><a class='card-link'>Learn More</a></Link>
                </div>
            </div>
            <div className="info-card">
                <div className="card-content">
                    <h2 class='card-heading'>Report Scam</h2>
                    <p>Warn others and report scam message</p>
                    <Link to='https://www.scamwatch.gov.au/report-a-scam' className="card-link-button"><a class='card-link'>Learn More</a></Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Home
