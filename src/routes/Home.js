import React from 'react'; // Import React library
import '../App.css'; // Import CSS file for global styles
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import Navbar from '../components/Navbar'; // Import Navbar component
import Image from '../assets/seniors.jpeg'; // Import image asset

// Define the Home component
const Home = () => {
  return (
    <div>
      {/* Background section with inline styles */}
      <section style={{
        backgroundImage: `url(${Image})`, // Set background image
        backgroundSize: 'cover', // Cover the entire background
        backgroundRepeat: 'no-repeat', // Do not repeat the background
        backgroundAttachment: 'fixed', // Fix the background position
        boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.45)', // Create a background overlay
        backgroundBlendMode: 'darken', // Blend mode for the background
      }}>
        {/* Render the Navbar component */}
        <Navbar />

        {/* Content section */}
        <section className="content">
          <div className="box-content">
            <div className="firstHalf">
              {/* Title and description */}
              <h1 className="centered-title">
                Unsure about a suspicious message?
              </h1>
              <p className="centered-description">
                Let's check!
              </p>
              {/* Button to learn more */}
              <div>
                <Link to='/detectscam' className='btn'>Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Card container for information */}
        <div className="card-container">
          {/* Information card 1 */}
          <div className="info-card">
            <div className="card-content">
              <h2 className='card-heading'>Be scam aware</h2>
              <p>Learn how to spot and identify scams</p>
              {/* Link to learn more */}
              <Link to="/" className="card-link-button"><a className='card-link'>Learn More</a></Link>
            </div>
          </div>
          {/* Information card 2 */}
          <div className="info-card">
            <div className="card-content">
              <h2 className='card-heading'>I've been scammed</h2>
              <p>Act straight away</p>
              {/* Link to help and support */}
              <Link to="/helpsupport" className="card-link-button"><a className='card-link'>Learn More</a></Link>
            </div>
          </div>
          {/* Information card 3 */}
          <div className="info-card">
            <div className="card-content">
              <h2 className='card-heading'>Report Scam</h2>
              <p>Warn others and report scam message</p>
              {/* External link to report a scam */}
              <Link to='https://www.scamwatch.gov.au/report-a-scam' target="_blank" className="card-link-button"><a className='card-link'>Learn More</a></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; // Export the Home component as the default export
