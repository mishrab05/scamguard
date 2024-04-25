import React from 'react'
import Navbar from '../components/Navbar'; // Import Navbar component
import { Link } from 'react-router-dom'; // Import Link for navigation
import Image from '../assets/background.png'; // Import image asset

const ScamQuiz = () => {
  return (
    <div>
        {/* Background section with inline styles */}
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
        
        <section className="content">
          <div className="box-content">
            <div className="firstHalf">
              {/* Title and description */}
              <h1 className="centered-title">
                Can you spot a scam?
              </h1>
              <p className="centered-description">
                Take this quiz to find out.
              </p>
              {/* Button to learn more */}
              <div>
                <Link to='/Quiz' className='btn'>Start Quiz</Link>
              </div>
            </div>
          </div>
        </section>

        </section>

        {/* Background section with inline styles */}
        <section style={{
            background: 'ccc',
            width: '100%',
            height: '70vh',
        }}>
          Score board
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
  )
}

export default ScamQuiz