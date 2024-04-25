import React from 'react'; // Import React library
import '../App.css'; // Import CSS file for global styles
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import Navbar from '../components/Navbar'; // Import Navbar component
import Image from '../assets/background.png'; // Import image asset

// Define the Home component
const Home = () => {
  return (
    <div>
      {/*Purple Background section with inline styles */}
      <section style={{
        width: '100%',
        height: '80vh',
        backgroundImage: `linear-gradient(135deg, rgba(181, 141, 237, 0.2), rgba(181, 141, 237, 0.9)), url(${Image})`, // Set background image
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
                <Link to='/detectscam' className='btn'>Get started</Link>
              </div>
            </div>
          </div>
        </section>

      </section>

      {/*White Background section with inline styles */}
      <section style={{
        width: '100%',
        height: '100vh',
      }}>
        
        <div className="content-section">
      {/* Sample text */}
      <div className="text-content">
        <p>This is a sample paragraph of text. You can replace it with your content.</p>
      </div>
      
      {/* Image */}
      <div className="image-container">
      <img src={require('../assets/trackorbg.jpg')} alt="Sample Image" />
      </div>
      </div>

      </section>

      {/*Light Purple Background section for boxes */}
      <section style={{
        width: '100%',
        height: '80vh',
        background: 'linear-gradient(135deg, #B58DED33, #B58DED)',
      }}>

        {/* Card container for information */}
        <div className="card-container">

          {/* Information card 1 */}
          <div className="info-card">
            <div className="card-content">
              <h2 className='card-heading'>I've been scammed</h2>
              <img src={require('../assets/image3.jpeg')} alt="Message Image" />
              <p>Act straight away</p>
              {/* Link to help and support */}
              <Link to="/helpsupport" className="card-link-button"><a className='card-link'>Learn More</a></Link>
            </div>
          </div>
          {/* Information card 2 */}
          <div className="info-card">
            <div className="card-content">
              <h2 className='card-heading'>Scam Quiz</h2>
              <img src={require('../assets/image2.jpeg')} alt="Message Image" />
              <p>Take a quiz to check your scam related knowledge</p>
              {/* External link to report a scam */}
              <Link to='/scamquiz' className="card-link-button"><a className='card-link'>Learn More</a></Link>
            </div>
          </div>
          {/* Information card 3 */}
          <div className="info-card">
            <div className="card-content">
              <h2 className='card-heading'>Be scam aware</h2>
              <img src={require('../assets/image1.jpeg')} alt="Message Image" />
              <p>Learn how to spot and identify scams</p>
              {/* Link to learn more */}
              <Link to="/scamtrends" className="card-link-button"><a className='card-link'>Learn More</a></Link>
            </div>
          </div>
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

    </div>
  );
}

export default Home; // Export the Home component as the default export
