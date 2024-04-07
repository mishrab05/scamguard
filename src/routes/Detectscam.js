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
        }}>
        <Navbar/>


        <section class="search-tool">
            <div class="box-content">
                <div>
                    <h1 class="centered-text">
                        A free tool to identify a scam text message
                    </h1>
                    <p class="centered-text">
                        Simply copy a text message into the box below and click SEARCH
                    </p>
                    <div className="search-box">
                        <input type="text" id="messageInput" placeholder="Enter text message here." value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <div>
                        <button className="searchButton"onClick={handleSearch}>Search</button>
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
              <button className="report-scam" onClick={() => navigate('/helpsupport')}>Report This</button>
              <button className="learn-more" onClick={() => navigate('/helpsupport')}>Learn More</button>
              <button className="nextStepsButton">Next Steps</button>
            </div>
        </section>
    
        </section>
    </div>
  );

}

export default Detectscam;