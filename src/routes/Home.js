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
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center',
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
                    <h2 class='card-heading'>Is this a scam?</h2>
                    <p>Warning signs to help you identify a scam</p>
                    <Link to="/detectscam" className="card-link-button"><a class='card-link'>Read more</a></Link>
                </div>
              </div>
              <div className="info-card">
                <div className="card-content">
                    <h2 class='card-heading'>Be scam aware!</h2>
                    <p>Learn how to spot and identify scams</p>
                    <Link to="/" className="card-link-button"><a class='card-link'>Read more</a></Link>
                </div>
            </div>
            <div className="info-card">
                <div className="card-content">
                    <h2 class='card-heading'>I've been scammed!</h2>
                    <p>Act straight away</p>
                    <Link to="/helpsupport" className="card-link-button"><a class='card-link'>Read more</a></Link>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default Home
