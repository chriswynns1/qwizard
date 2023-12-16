import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  limit, 
} from "firebase/firestore";
import { auth } from "./firebase";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const firestore = getFirestore();
        const leaderboardCollection = collection(firestore, "users");
        const leaderboardQuery = query(
          leaderboardCollection,
          orderBy("points", "desc"),
          limit(5), 
        );
        const leaderboardSnapshot = await getDocs(leaderboardQuery);

        const leaderboardDataArray = [];

        leaderboardSnapshot.forEach((doc) => {
          const userData = doc.data();
          leaderboardDataArray.push({
            username: userData.username,
            points: userData.points || 0,
          });
        });

        setLeaderboardData(leaderboardDataArray);
        console.log("leaderboard data:", leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []); 

  return (
    <div class="leaderboard-container">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <div>
        <body>
          <div className="leaderboard-container">
            <div className="main">
              <div id="header">
                <h1>Ranking</h1>
              </div>
              <div id="leaderboard">
                <div className="ribbon"></div>
                <table>
                  <tr>
                    <td className="number">1</td>
                    <td className="name">{leaderboardData[0]?.username}</td>
                    <td className="points">
                      {leaderboardData[0]?.points}{" "}
                      <img
                        className="gold-medal"
                        src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                        alt="gold medal"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="number">2</td>
                    <td className="name">{leaderboardData[1]?.username}</td>
                    <td className="points">{leaderboardData[1]?.points}</td>
                  </tr>
                  <tr>
                    <td className="number">3</td>
                    <td className="name">{leaderboardData[2]?.username}</td>
                    <td className="points">{leaderboardData[2]?.points}</td>
                  </tr>
                  <tr>
                    <td className="number">4</td>
                    <td className="name">{leaderboardData[3]?.username}</td>
                    <td className="points">{leaderboardData[3]?.points}</td>
                  </tr>
                  <tr>
                    <td className="number">5</td>
                    <td className="name">{leaderboardData[4]?.username}</td>
                    <td className="points">{leaderboardData[4]?.points}</td>
                  </tr>
                </table>
                <div id="buttons">
                  <a href="/category">
                    <button className="leaderboardbuttons">Exit</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
}

export default Leaderboard;
