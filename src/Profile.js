import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TriviaCategoryCard2 from "./TriviaCategoryCard2";
import { onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
  limit,
} from "firebase/firestore";
import { auth } from "./firebase";

const categoryData = [
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

function Profile() {
  const [userFavorites, setUserFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(null);
  const [highscore, setHighscore] = useState(null); // Updated state name
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        const firestore = getFirestore();
        const leaderboardCollection = collection(firestore, "users");
        const leaderboardQuery = query(
          leaderboardCollection,
          orderBy("points", "desc"),
          limit(1),
        );
        const leaderboardSnapshot = await getDocs(leaderboardQuery);

        // Retrieve highscore from the leaderboardSnapshot
        const highscoreData = leaderboardSnapshot.docs[0]?.data();
        const highscoreValue = highscoreData?.points || 0;
        setHighscore(highscoreValue); // Set the highscore state

        if (user) {
          const uid = user.uid;
          const firestore = getFirestore();
          const userDocRef = doc(firestore, "users", uid);

          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            console.log("username:", userData.username);
            setUser(userData);
            setUserFavorites(userData.favoriteCategories || []);
            setPoints(userData.points || 0);
            setUsername(userData.username);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, fetchUserData);

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Calculate the percentage based on the current points and the highscore
  const calculatePercentage = () => {
    if (points === null || highscore === null) return 0;
    const percentage = (points / highscore) * 100;
    return percentage > 100 ? 100 : percentage; // Ensure the percentage doesn't exceed 100%
  };

  const progressPercentage = calculatePercentage();

  const filteredCategories = categoryData.filter((category) =>
    userFavorites.includes(category.id),
  );

  return (
    <div className="biggerbox">
      <div className="bigbox">
        <div className="box">
          <div className="text-3xl md:text-5xl text-center m-3 md:m-5 animate-slideup transitioninset-0 ease-in-out delay-150 flex flex-col items-center">
            <span className="text-white mb-2">Hey {username}!</span>

            <div className="pt-2">
              <span className="text-2xl text-white">Total points:</span>
              <span className="text-white">{points}</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="text-3xl md:text-5xl text-center m-3 md:m-5 animate-slideup transitioninset-0 ease-in-out delay-150 ">
            Points Goal
          </div>
          <div className="progress2 progress-moved animate-slideup transitioninset-0 ease-in-out delay-150">
            <div
              className="progress-bar2 animate-slideup transitioninset-0 ease-in-out delay-150"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor: "#3784db",
              }}
            ></div>
          </div>
          {progressPercentage === 100 && (
            <div className="text-3xl md:text-5xl text-center m-3 md:m-5 animate-slideup transitioninset-0 ease-in-out delay-150 flex flex-col items-center">
              <span className="text-yellow-500">Ranked Number 1</span>
            </div>
          )}
        </div>
      </div>
      <div className="favorites">
        <div className="text-3xl md:text-5xl text-center m-3 md:m-5 animate-slideup transitioninset-0 ease-in-out delay-150 ">
          Favorite Quizzes
        </div>
        <div className="category-links">
          {filteredCategories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <TriviaCategoryCard2 category={category} onClick={() => {}} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
