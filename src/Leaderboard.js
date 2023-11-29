import React from "react";
import "./Styles.css";

function Leaderboard() {
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
          <div class="main">
            <div id="header">
              <h1>Ranking</h1>
              {/*<button class="share">   -------------------MAYBE WE DO DIS LATER
          <i class="ph ph-share-network"></i>
        </button>*/}
            </div>
            <div id="leaderboard">
              <div class="ribbon"></div>
              <table>
                <tr>
                  <td class="number">1</td>
                  <td class="name">NAME 1</td>
                  <td class="points">
                    0{" "}
                    <img
                      class="gold-medal"
                      src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                      alt="gold medal"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="number">2</td>
                  <td class="name">NAME 2</td>
                  <td class="points">0</td>
                </tr>
                <tr>
                  <td class="number">3</td>
                  <td class="name">NAME 3</td>
                  <td class="points">0</td>
                </tr>
                <tr>
                  <td class="number">4</td>
                  <td class="name">NAME 4</td>
                  <td class="points">0</td>
                </tr>
                <tr>
                  <td class="number">5</td>
                  <td class="name">NAME 5</td>
                  <td class="points">0</td>
                </tr>
              </table>
              <div id="buttons">
                <a href="/">
                  <button class="leaderboardbuttons">Exit</button>
                </a>
                <a href="/">
                  <button class="leaderboardbuttons">Continue</button>
                </a>
              </div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
}

export default Leaderboard;
