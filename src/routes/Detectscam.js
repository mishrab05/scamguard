import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 
import Navbar from '../components/Navbar'
import Image from '../assets/trackorbg.jpg'

const Detectscam =()=>{
  const [message, setMessage] = useState('');
  const [results, setResults] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    
    setResults(`Results for "${message}"`);
  };

  return(
    <div>
        <section style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'darken',
        boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.15)',
        }}>
        <Navbar/>

        <section class="search-tool">
            <div class="box-content">
                <div>
                    <h1 class="centered-text">
                        A free tool to identify a scam text message
                    </h1>
                    <p class="centered-text">
                        Simply copy a text message into the box below and click SUBMIT
                    </p>

                    {/* Card with instructions */}
                    <div className="card-container">    
                        <div className="info-cardx">
                            <div className="card-contentx">
                                <h3>User Guide:</h3>
                                <ol>
                                    <li>Open the message in your phone</li>
                                    <li>Press and hold onto the message</li>
                                    <li>Look for the "copy" symbol and select it</li>
                                    <li>On this page, press and hold in the text box</li>
                                    <li>Select "paste" symbol</li>
                                    <li>Click Submit</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Search box */}
                    <div className="search-box">
                        <input type="text" id="messageInput" placeholder="Enter text message here." value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <div>
                        <button className="searchButton"onClick={handleSearch}>Submit</button>
                    </div>
                </div>
            </div>
		</section>
      
        <section className="result-section">
            <div id="searchResults" className="search-results">
                <p>Search Results</p>
            </div>
        </section>

        <section className="result-section">
            <div className="result-actions">
            <button className="homeButton" onClick={() => navigate('/')}>Home</button>
                <button className="report-scam" onClick={() => window.open('https://www.scamwatch.gov.au/report-a-scam')}>Report Scam</button>
                <button className="learn-more" onClick={() => navigate('/helpsupport')}>Learn More</button>
            </div>
        </section>
    
        </section>
    </div>
  );

}

export default Detectscam;