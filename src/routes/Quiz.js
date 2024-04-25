import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component
import { Link } from 'react-router-dom'; // Import Link for navigation
import service from '../axios/service';
import Image from '../assets/books.jpg'; // Import image asset


const questions = [
{
    questionText: 'Question 1',
    answerOptions: [
        { answerText: 'Scam', isCorrect: true },
        { answerText: 'Not a scam', isCorrect: false },
        
    ],
    explanation: 'Explanation',
    },
    {
    questionText: 'Question 2',
    answerOptions: [
        { answerText: 'Scam', isCorrect: true },
        { answerText: 'Not a scam', isCorrect: false },
        
    ],
    explanation: 'Explanation',
    },
    {
    questionText: 'Question 3',
    answerOptions: [
        { answerText: 'Scam', isCorrect: true },
        { answerText: 'Not a scam', isCorrect: false },
        
    ],
    explanation: 'Explanation',
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
            background: 'linear-gradient(135deg, #B58DED33, #B58DED)',
            width: '100%',
            height: '140vh',
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

          <div>
          <div className='quiz-section'> 
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
              </div>
              {currentQuestionIndex === 0 && ( // Check if current question is Question 1
                <div className="question-text">
                  <p class='quiz-text'>You have received the message below from an unknown sender.</p>
                  <p class='quiz-text'>Identify whether it is a scam message or not.</p>
                  <img src={require('../assets/Easlink.png')} alt="Message Image" />
                </div>
              )}
              {currentQuestionIndex === 1 && ( // Check if current question is Question 2
                <div className="question-text">
                  <p class='quiz-text'>You have received the message below from an unknown sender.</p>
                  <p class='quiz-text'>Identify whether it is a scam message or not.</p>
                  <img src={require('../assets/Shipping issue.png')} alt="Message Image" />
                </div>
              )}
              {currentQuestionIndex === 2 && ( // Check if current question is Question 3
                <div className="question-text">
                  <p class='quiz-text'>You have received the message below from an unknown sender.</p>
                  <p class='quiz-text'>Identify whether it is a scam message or not.</p>
                  <img src={require('../assets/Overdue notice.png')} alt="Message Image" />
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
            </div>
   
            <div className="explanation">   
            {showExplanation && (
              <div className="explanation-section">
                <p>{questions[currentQuestionIndex].explanation}</p>
                {currentQuestionIndex === 0 && ( // Check if current question is Question 1
                  <div className='explanation-text'>
                    <p class='quiz-text'>It is a scam message.</p>
                    <p class='quiz-text'>Explanation for why it's a scam...</p>
                  </div>
                )}
                {currentQuestionIndex === 1 && ( // Check if current question is Question 2
                  <div className='explanation-text'>
                    <p class='quiz-text'>It is a scam message.</p>
                    <p class='quiz-text'>Explanation for why it's a scam...</p>
                  </div>
                )}
                {currentQuestionIndex === 2 && ( // Check if current question is Question 3
                  <div className='explanation-text'> 
                    <p class='quiz-text'>It is a scam message.</p>
                    <p class='quiz-text'>Explanation for why it's a scam...</p>
                  </div>
                )}
                <button onClick={currentQuestionIndex < questions.length - 1 ? handleNextQuestion : handleShowResults}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
                </button>
              </div>
            )}
          </div> 
          </div>
        )
      ) : null}


          <div className='quiz-end'>
              <Link to='/scamquiz' className='exit-button'>Exit quiz</Link>
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
    
export default Quiz;