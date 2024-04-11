import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import '../App.css'; // Import CSS file for global styles
import Navbar from '../components/Navbar'; // Import Navbar component
import { Link } from 'react-router-dom'; // Import Link for navigation

// Define the HelpSupport component
const StaticCounter = () => {
	const [reportData, setReportData] = useState({
	  amount: 0,
	  numReports: 0,
	  finLossReports: 0,
	});
  
	useEffect(() => {
	  axios.get('http://172.214.52.33/latest-report') // Replace with your actual Flask API URL
		.then(response => {
		  setReportData({
			amount: response.data.amount,
			numReports: response.data.num_reports,
			finLossReports: response.data.fin_loss_reports,
		  });
		})
		.catch(error => {
		  console.error('Error fetching data:', error);
		});
	}, []);
  
	return (
	  <div className="counter-graph">
		<div className="statistic">
		  <div className="label">Amount lost</div>
		  <div className="value">${new Intl.NumberFormat().format(reportData.amount)}</div>
		</div>
		<div className="statistic">
		  <div className="label">Number of reports</div>
		  <div className="value">{reportData.numReports}</div>
		</div>
		<div className="statistic">
		  <div className="label">Reports with financial losses</div>
		  <div className="value">{reportData.finLossReports}%</div>
		</div>
	  </div>
	);
  };
  // Define the HelpSupport component
const HelpSupport = () => {
  return (
    <div>
		<Navbar/>

		{/* Header section */}
		<section class="header">
			<h1 class="text-header">I'VE BEEN SCAMMED</h1>
			<p class="text-header">Steps to take after falling victim to a scam</p>	
		</section>

		{/* Statistics section */}
		<div className="statistics-container">
        <h1 className="statistics-title">Statistics:</h1>
        <StaticCounter />
      </div>

		{/* Section for main content */}
		<section class="section">
			<div class="box-main">
				<div class="firsthalf">
					<h1 class="text-big" id="actfast">
						ON THIS PAGE:
					</h1>
					<a href="#actfast" class="text-bullet">1. Act fast</a>
					<a href="#gethelp" class="text-bullet">2. Get help</a>
					<a href="#reportscam" class="text-bullet">3. Report scam</a>
					<a href="#followup" class="text-bullet">4. Watch out for follow up scams</a>
					<a href="#support" class="text-bullet">5. Get support</a>
				</div>
			</div>
		</section>

		{/* Section for step 1 */}
		<section class="section">
			<div class="box-main">
				<div class="firstHalf">
					{/* Step 1: Act fast */}
					<h1 class="text-big" id="actfast">
						1. Act fast
					</h1>
					<p class="text-small">If you suspect you have been scammed, it is crucial to act swiftly to minimize potential damage.</p>
					<p class="text-small">Here are the steps you should take:</p>
					<p class="text-small">
						<ol class='indented-list'>
							<li>Contact your bank or card provider immediately to report the scam. Request your bank to stop any transactions.</li>
							<li>Change your passwords to any accounts which may be accessed (Bank).</li>
							<li>Contact your telecommunications provider for advice to block future phishing attempts.</li>
						</ol>
					</p>
					<p class="text-small">
						You can also register your phone number on the Do Not Call Register which prevents you from getting most unsolicited telemarketing calls. 
					</p>
					<Link to='https://www.donotcall.gov.au/' target="_blank"><a class='text-link'>Click here to register</a></Link>
				</div>
			</div>
		</section>

		{/* Section for step 2 */}
		<section class="section">
			<div class="box-main">
				<div class="secondHalf">
					{/* Step 2: Get help */}
					<h1 class="text-big" id="gethelp">
						2. Get help
					</h1>
					<p class="text-small">
						If you're not satisfied with the way your bank handled your case, make a complaint to the Australian Financial Complaints Authority.
					</p>
					<Link to='https://www.afca.org.au/make-a-complaint' target="_blank"><a class='text-link'>Click here to file complaint</a></Link>
					<p class="text-small">How do i make a complaint?</p>
					<Link to='https://www.youtube.com/watch?v=EK8PlurJZog&ab_channel=AustralianFinancialComplaintsAuthority' target="_blank"><a class='text-link'>Click here to watch video</a></Link>
					<p class="text-bold">Consider contacting IDCARE</p>
					<p class="text-small">IDCARE is a free service in Australia and New Zealand. Their excellent response and mitigation services have helped thousands of Australian and New Zealander individuals and companies lessen the harm caused by identity information breach and misuse.</p>
				</div>
			</div>
		</section>

		{/* Section for step 3 */}
		<section class="section">
			<div class="box-main">
				<div class="secondHalf">
					<h1 class="text-big" id="reportscam">
						3. Report scam
					</h1>
					<p class="text-small">You can help us warn others by reporting to Scamwatch.</p>
					<p class="text-small">Steps to report on ScamWatch:</p>
					<p class="text-small">
						<ol class='indented-list'>
							<li>Select the link below</li>
							<li>On ScamWatch website, look for the orange Report Scam button and select it</li>
							<li>Select Start report</li>
							<li>Enter scam details as prompted</li>
							<li>Enter your details</li>
							<li>Preview and Submit your report</li>
						</ol>
					</p>
					<Link to='https://www.scamwatch.gov.au/report-a-scam' target="_blank"><a class='text-link'>Click here to report to Scamwatch</a></Link>
				</div>
			</div>
		</section>

		{/* Section for step 4 */}
		<section class="section">
			<div class="box-main">
				<div class="secondHalf">
					<h1 class="text-big" id="followup">
						4. Watch out for follow up scams
					</h1>
					<p class="text-small">Scammers frequently return for more money if they have already taken it from you.</p>
					<p class="text-small">Regretfully, 1 in 3 scam victims have fallen victim to scams more than once.</p>
				</div>
			</div>
		</section>

		{/* Section for step 5 */}
		<section class="section">
			<div class="box-main">
				<div class="secondHalf">
					<h1 class="text-big" id="support">
						5. Get support
					</h1>
					<p class="text-small">
						Anyone could be a victim of a scam which is a terrible experience. You might feel like it is your fault but IT IS NOT.
					</p>
					<p class="text-small">
						If you need someone to talk to, don't be embarrassed to speak to family and friends.
					</p>
					<p class="text-small">
						Alternatively, the following are available services you can contact to have a chat online or over the phone:
					</p>
					<p class="text-bold">Beyond Blue</p>
					<p class="text-small">1300 22 4636 or online chat (24 hours a day, 7 days a week)</p>
					<Link to='https://www.beyondblue.org.au/get-support/talk-to-a-counsellor/chat' target="_blank"><a class='text-link'>Click here for online support</a></Link>
					<p class="text-bold">Lifeline</p>
					<p class="text-small">13 11 14 or online crisis support chat (24 hours a day, 7 days a week)</p>
					<Link to='https://www.lifeline.org.au/crisis-chat/' target="_blank"><a class='text-link'>Click here for online support</a></Link>
				</div>
			</div>
		</section>

		<footer className="footer">
            <p className="text-footer">
                Team - Agile Rangers
            </p>
        </footer>

	</div>
  )
}

export default HelpSupport