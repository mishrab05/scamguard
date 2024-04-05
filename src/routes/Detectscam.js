import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'; 
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
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
        backgroundPosition: 'center center'
      }}> 
      <Navbar/>
      
      
        <section className="search-tool">
          <div className="tracker-message">
            <p className="tracker-text">A free tool to identify scam text message.</p>
            <p className="tracker-text">Simply copy a text message into the box below and click SEARCH.</p>
            <input type="text" id="messageInput" placeholder="Enter text message" value={message}
              onChange={(e) => setMessage(e.target.value)} />
            <button className="searchButton"onClick={handleSearch}>Search</button>
          </div>
        </section>

        <section className="result-section">
          <div id="searchResults" className="search-results">
            <p>Search results will appear here</p>
          </div>

          <div className="result-actions">
            <button className="report-scam">Report This</button>
            <button className="learn-more" onClick={() => navigate('/help')}>Learn More</button>
            <button className="homeButton" onClick={() => navigate('/')}>Home Page</button>
            <button className="nextStepsButton">Next Steps</button>
          </div>
        </section>
    
      </section>
      </div>
  );

}

export default Detectscam;