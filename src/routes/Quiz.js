import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component
import { Link } from 'react-router-dom'; // Import Link for navigation
import service from '../axios/service';
import Image from '../assets/books.jpg'; // Import image asset


const questions = [
{
    questionText: 'Question 1',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a scam', isCorrect: true },
        
    ],
    explanation: 'Q1 explanation',
    },
    {
    questionText: 'Question 2',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a scam', isCorrect: true },
        
    ],
    explanation: 'Q2 explanation',
    },
    {
    questionText: 'Question 3',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a scam', isCorrect: true },
        
    ],
    explanation: 'Q3 explanation',
    }
];
  

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [username, setUsername] = useState('');
    const [percentileRank, setPercentileRank] = useState(null);
    const [topScores, setTopScores] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showUsernameInput, setShowUsernameInput] = useState(true);
    const [usernameSubmitted, setUsernameSubmitted] = useState(false);
    
    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
        setScore(score + 1);
        }
        setShowExplanation(true); // After answer question, show result
    };
    
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowExplanation(false); // Move on to the next question and hide the parsing
        } else {
        setShowExplanation(false); // Hide parsing and prepare to display the final result
        }
    };
    
    const handleShowResults = async () => {
        try {
            
            setShowResults(true);
    
            // send post to API
            const response = await service({
                method: 'POST',
                url: '/score-submit',
                data: {
                    username: username,  
                    score: score
                }
            });
    
            setTopScores(response.data.top_scores);
            setPercentileRank(response.data.percentile_rank);
        } catch (error) {
            console.error('Error submitting score:', error);  
        }
    };

    const handleUsernameSubmit = () => {
        if (username.trim()) {
          setUsernameSubmitted(true); // 
          setShowUsernameInput(false); // 
        } else {
          alert('Please enter a valid username.'); //
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
            boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.35)', // Create a background overlay
            backgroundBlendMode: 'darken', // Blend mode for the background
            height: '100vh',
        }}>
        <Navbar />


        {showUsernameInput ? (
        <div className="username-input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          {/*submit button for username*/}
          <div>
            <button className='btn' onClick={handleUsernameSubmit}>Submit</button>
          </div>
        </div>
      ) : usernameSubmitted ? (
        showResults ? (
          <div className="score-section">
            <p>Username: {username}</p>
            <p>Your score: {score}</p>
            <p>Your percentile rank is: {percentileRank ? `${percentileRank.toFixed(2)}%` : ''}</p>
            <p>Top five scores:</p>
            <ol>
              {topScores.map((item, index) => (
                <li key={index}>{item.username}: {item.score}</li>
              ))}
            </ol>
          </div>
        ) : (


          <div className='quiz-section'> 
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
              </div>
              {currentQuestionIndex === 0 && ( // Check if current question is Question 1
                <div className="question-text">
                  <p>You have received the message below from an unknown sender.</p>
                  <p>Identify whether it is a scam message or not.</p>
                  <img src={require('../assets/Easlink.png')} alt="Message Image" />
                </div>
              )}
              {currentQuestionIndex === 1 && ( // Check if current question is Question 2
                <div className="question-text">
                  <p>You have received the message below from an unknown sender.</p>
                  <p>Identify whether it is a scam message or not.</p>
                  <img src={require('../assets/Easlink.png')} alt="Message Image" />
                </div>
              )}
              {currentQuestionIndex === 2 && ( // Check if current question is Question 3
                <div className="question-text">
                  <p>You have received the message below from an unknown sender.</p>
                  <p>Identify whether it is a scam message or not.</p>
                  <img src={require('../assets/Easlink.png')} alt="Message Image" />
                </div>
              )}
              <div className="answer-section">
                {questions[currentQuestionIndex].answerOptions.map((option, index) => (
                  <button
                    key={index}
                    className={option.isCorrect ? 'is-not-scam' : 'is-scam'}
                    onClick={() => handleAnswerOptionClick(option.isCorrect)}
                    disabled={showExplanation}
                  >
                    {option.answerText}
                  </button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className="explanation-section">
                <p>{questions[currentQuestionIndex].explanation}</p>
                {currentQuestionIndex === 0 && ( // Check if current question is Question 1
                  <div>
                    <p>It is a scam message.</p>
                    <p>Explanation for why it's a scam...</p>
                  </div>
                )}
                {currentQuestionIndex === 1 && ( // Check if current question is Question 2
                  <div>
                    <p>It is a scam message.</p>
                    <p>Explanation for why it's a scam...</p>
                  </div>
                )}
                {currentQuestionIndex === 2 && ( // Check if current question is Question 3
                  <div>
                    <p>It is a scam message.</p>
                    <p>Explanation for why it's a scam...</p>
                  </div>
                )}
                <button onClick={currentQuestionIndex < questions.length - 1 ? handleNextQuestion : handleShowResults}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
                </button>
              </div>
            )}
          </div> 
        )
      ) : null}



      
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
    
export default Quiz;