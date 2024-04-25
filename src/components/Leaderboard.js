import React, { useState, useEffect } from 'react';
import './LeaderboardStyles.css'; // Import your CSS file for styling
import service from '../axios/service'; 

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]); // State to store the leaderboard data

  useEffect(() => {
    // Fetch data from your Flask API using a service wrapper around axios or similar library
    service({
      method: 'GET',
      url: '/leaderboard_top5'
    }).then(response => {
      setLeaders(response.data); // Update the state with the fetched data
    }).catch(error => {
      console.error('Failed to fetch leaderboard data:', error);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <main>
      <div id="header">
        <h1 class='rank'>Ranking</h1>
      </div>
      <div id="leaderboard">
        <div className="ribbon"></div>
        <table>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={index}>
                <td className="number">{index + 1}</td>
                <td className="name">{leader.username}</td>
                <td className="points">
                  {leader.score}
                  {index === 0 && (
                    <img
                      className="gold-medal"
                      src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                      alt="gold medal"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Leaderboard;

