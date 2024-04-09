import React, { useState } from 'react'; // Import React and useState hook for managing state
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation
import '../App.css'; // Import CSS file for global styles
import Navbar from '../components/Navbar'; // Import Navbar component
import Image from '../assets/trackorbg.jpg'; // Import image asset
import axios from 'axios'; // Import axios for making HTTP requests

// Define the Detectscam component
const Detectscam = () => {
  const [message, setMessage] = useState(''); // State for message input
  const [results, setResults] = useState(''); // State for prediction results
  const navigate = useNavigate(); // Navigate function for programmatic navigation

  // Function to handle search button click
  const handleSearch = async () => {
    try {
      // Make a POST request to the Flask API for prediction
      const response = await axios.post('http://172.214.52.33/predict', { text: message });
      setResults(`Result : ${response.data.result}`); // Update results with prediction
    } catch (error) {
      console.error('Error:', error); // Log error if request fails
      setResults('Error making prediction'); // Update results with error message
    }
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
            <div>
              <h1 className="centered-text">
                Identify a scam text message
              </h1>
              <p className="centered-text">
                Simply copy a text message into the box below and click submit
              </p>

              {/* Card with user guide instructions */}
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
                      <li>Click Submit</li>
                      <li>Scroll down to see the result</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Search box for entering message */}
              <div className="search-box">
                <input type="text" id="messageInput" placeholder="Enter text message here." value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <div>
                {/* Search and clear buttons */}
                <button className="searchButton" onClick={handleSearch}>Submit</button>
                <button className="clearButton" onClick={() => setMessage('')}>Clear</button>
              </div>
            </div>
          </div>
        </section>

        {/* Section to display search results */}
        <section className="result-section">
            <h1 className="centered-text">
                Result:
            </h1>
          <div id="searchResults" className="search-results">
            <p>{results}</p>
          </div>
        </section>

        {/* Section for result actions */}
        <section className="result-section">
          <div className="result-actions">
            {/* Navigation buttons */}
            <button className="homeButton" onClick={() => navigate('/')}>Home</button>
            <button className="learn-more" onClick={() => navigate('/helpsupport')}>Help & Support</button>
          </div>
        </section>

      </section>
    </div>
  );
}

export default Detectscam; // Export the Detectscam component as the default export
