import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component
import { Link } from 'react-router-dom'; // Import Link for navigation
import service from '../axios/service';

const questions = [
{
    questionText: 'Question1',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q1 explanation',
    },
    {
    questionText: 'Question2',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q2 explanation',
    },
    {
    questionText: 'Question3',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q3 explanation',
    },
    {
    questionText: 'Question4',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q4 explanation',
    },
    {
    questionText: 'Question5',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q5 explanation',
    },
    {
    questionText: 'Question6',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q6 explanation',
    },
    {
    questionText: 'Question7',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q7 explanation',
    },
    {
    questionText: 'Question8',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q8 explanation',
    },
    {
    questionText: 'Question9',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q9 explanation',
    },
    {
    questionText: 'Question10',
    answerOptions: [
        { answerText: 'Scam', isCorrect: false },
        { answerText: 'Not a Scam', isCorrect: true },
        
    ],
    explanation: 'Q10 explanation',
    },
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
        <div className="quiz">
          <Navbar />
          {showUsernameInput ? (
            <div className="username-input">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
              <button onClick={handleUsernameSubmit}>Submit Username</button>
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
                <div className="question-section">
                  <div className="question-count">
                    <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
                  </div>
                  <div className="question-text">{questions[currentQuestionIndex].questionText}</div>
                  <div className="answer-section">
                    {questions[currentQuestionIndex].answerOptions.map((option, index) => (
                      <button
                        key={index}
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
                    <button onClick={currentQuestionIndex < questions.length - 1 ? handleNextQuestion : handleShowResults}>
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Show Results'}
                    </button>
                  </div>
                )}
              </div> 
            )
          ) : null}
        </div>
      );
      
}
    
export default Quiz;