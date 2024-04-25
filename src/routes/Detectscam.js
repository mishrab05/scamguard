import React, { useState, useRef} from 'react'; // Import React and useState hook for managing state
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import '../App.css'; // Import CSS file for global styles
import Navbar from '../components/Navbar'; // Import Navbar component
import Image from '../assets/blueplain.jpg'; // Import image asset

import axios from 'axios'; // Import axios for making HTTP requests
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'; // Import the arrow left icon from React Icons
import service from '../axios/service';

// Define the Detectscam component
const Detectscam = () => {
  const resultsRef = useRef(null); 
  const [message, setMessage] = useState(''); // State for message input
  const [results, setResults] = useState(''); // State for prediction results
  const [showConsentPopup, setShowConsentPopup] = useState(false); //for consent popup
  const navigate = useNavigate(); // Navigate function for programmatic navigation
  const clearBoth = () => {
    setMessage('');
    setResults('');
    setShowConsentPopup(false)

  };

  // Function to handle search button click
  const handleSearch = async () => {
    try {
        // Make a POST request to the Flask API for prediction
        const response = await axios.post('http://192.168.0.109:5000/predict', { text: message });
        setResults(response.data.result);  // Update results with prediction
        
        // Scroll into view
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setShowConsentPopup(true);
        console.log("Popup should now show"); // Debugging log
    } catch (error) {
        console.error('Error:', error);  // Log error if request fails
        setResults('Error making prediction');  // Update results with error message
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setShowConsentPopup(false);

    }
};

  const handleUserConsent = (consentGiven) => {
      setShowConsentPopup(false);
      console.log(consentGiven ? 'User consented to use data for training' : 'User did not consent to use data for training');
    };

  return (
    <div>
      {/* Background section with inline styles */}
      <section style={{
        backgroundImage: `url(${Image})`, // Set background image
        backgroundSize: 'cover', // Cover the entire background
        backgroundRepeat: 'no-repeat', // Do not repeat the background
        backgroundAttachment: 'fixed', // Fix the background position
        backgroundBlendMode: 'darken', // Blend mode for the background
        boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.15)', // Create a background overlay
      }}>
        {/* Render the Navbar component */}
        <Navbar />

        {/* Search tool section */}
        <section className="search-tool">
          <div className="box-content">
              <h1 className="centered-text">
                Spot scam text messages easily !
              </h1>
              <p className="centered-text">
              Just paste the suspicious text message into the box below and press 'Check' to see if it's safe!
              </p>
              {/* Disclaimer */}
              <p className="disclaimer">
              Disclaimer : We've designed our scam detection tool to help you identify potential SMS scams, but please remember that the accuracy of the results can vary. Our tool’s effectiveness depends on the data it has been trained on, and it may not always capture every scam accurately.
              The current accuracy of the tool is 94%.
              </p>

              {/* Card with user guide instructions */}
              <div className='flex-container'>
                <div className="card-container">
                  <div className="info-cardx">
                    <div className="card-contentx">
                      <h3>User Guide:</h3>
                      <ol>
                        {/* List of user guide steps */}
                        <li>Open the message in your phone</li>
                        <li>Press and hold onto the message</li>
                        <li>Look for the "copy" symbol and select it</li>
                        <li>On this page, press and hold in the text box</li>
                        <li>Select "paste" symbol</li>
                        <li>Click Check</li>
                        <li>Scroll down to see the result</li>
                      </ol>
                    </div>
                  </div>
                </div>
              

              {/* Search box for entering message */}
              <div className="input-area">
                <div className="search-box">
                  <textarea id="messageInput" placeholder="Enter text message here." value={message} onChange={(e) => setMessage(e.target.value)} ></textarea>
                </div>
                <div class="checkclear-container">
                  {/* Search and clear buttons */}
                  <button className="check-button" onClick={handleSearch}>Check</button>
                  <button className="check-button clear-Button" onClick={clearBoth}>Clear</button>
                </div>
              </div>
            </div>
            </div>
          </section>
    

        {/* Section to display search results */}
        <section ref={resultsRef} className="result-section1">
           <h1 className="centered-text">
            Result : {results === "It is a Scam" ? (
                        <span>
                            {results} <span className="jumping-icon">❗</span>
                        </span>
                    ) : (
                        results
            )}
          </h1>
          {showConsentPopup && (
                            <div className="consent-popup">
                                <p>Your input helps us improve. Can we use the message you just entered to make our prediction better? We only use this information to improve our ability to detect scams.</p>
                                <button className="button-68 button-yes" onClick={() => handleUserConsent(true)}>Yes</button>
                                <button className="button-68 button-no" onClick={() => handleUserConsent(false)}>No</button>
                            </div>
                        )}
          </section>


        {/* Section for result actions */}
        <section className="result-section">
          <div className="result-actions">
            {/* Navigation buttons */}
            <button className="homeButton" onClick={() => navigate('/')}><BsArrowLeft/>Home</button>
            <button className="learn-more" onClick={() => navigate('/helpsupport')}>Help & Support <BsArrowRight /></button>
          </div>
        </section>

        <footer className="footer">
            <div className="footer-left">
                <p className="text-footer">
                  Team - Agile Rangers
                </p>
              </div>
              <div className="footer-right">
                <p className="footer-link">About Us</p>
                <p className="footer-link">Privacy Policy</p>
                <p className="footer-link">Terms & Conditions</p>
            </div>
		    </footer>

        </section>
    </div>
  );
};

export default Detectscam; // Export the Detectscam component as the default export
