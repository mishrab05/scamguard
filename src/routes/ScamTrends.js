import React from 'react'
import '../App.css'; // Import CSS file for global styles
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom for navigation
import Navbar from '../components/Navbar'; // Import Navbar component


const ScamTrends = () => {
  return (
    <div>
        {/* Background section with inline styles */}
        <section style={{
            height: '1920px', /*height of the page*/
            background: 'rgb(250, 250, 250)', /*background colour of the page*/
        }}>
        <Navbar/>
        ScamTrends



        </section>
        {/*footer*/}
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

export default ScamTrends