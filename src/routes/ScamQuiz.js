import React from 'react'
import Navbar from '../components/Navbar'; // Import Navbar component
import { Link } from 'react-router-dom'; // Import Link for navigation
import Image from '../assets/books.jpg'; // Import image asset

const ScamQuiz = () => {
  return (
    <div>
        {/* Background section with inline styles */}
        <section style={{
            backgroundImage: `url(${Image})`, // Set background image
            backgroundSize: 'cover', // Cover the entire background
            backgroundRepeat: 'no-repeat', // Do not repeat the background
            backgroundAttachment: 'fixed', // Fix the background position
            boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.35)', // Create a background overlay
            backgroundBlendMode: 'darken', // Blend mode for the background
            height: '100vh',
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

        <footer className="footer">
			<div className="footer-left">
				<p className="text-footer">
					Team - Agile Rangers
				</p>
			</div>
			<div className="footer-right">
				<p className="footer-link">Privacy</p>
				<p className="footer-link">Terms & Conditions</p>
			</div>
		</footer>
        
    </div>
  )
}

export default ScamQuiz