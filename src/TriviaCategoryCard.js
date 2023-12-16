import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function TriviaCategoryCard({ category, onClick, onCategoryToggle }) {
  // Added missing prop onCategoryToggle
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const uid = user.uid;
          const firestore = getFirestore();
          const userDocRef = doc(firestore, "users", uid);

          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserFavorites(userData.favoriteCategories || []);
          }
        }
      } catch (error) {
        console.error("Error fetching user favorites:", error);
      }
    };

    fetchUserFavorites();
  }, []);

  // Function to map categories to emojis
  const mapCategoryToEmoji = (category) => {
    const categoryLower = category.toLowerCase();
    const emojiMap = {
      "general knowledge": "🌐",
      "entertainment: books": "📚",
      "entertainment: film": "🎬",
      "entertainment: music": "🎵",
      "entertainment: musicals & theatres": "🎭",
      "entertainment: television": "📺",
      "entertainment: video games": "🎮",
      "entertainment: board games": "🎲",
      "science & nature": "🔬",
      "science: computers": "💻",
      "science: mathematics": "🧮",
      mythology: "🏛️",
      sports: "⚽",
      geography: "🌍",
      history: "📜",
      politics: "🏛️",
      art: "🎨",
      celebrities: "🌟",
      animals: "🐾",
      vehicles: "🚗",
      "entertainment: comics": "🦸",
      "science: gadgets": "🔧",
      "entertainment: japanese anime & manga": "🇯🇵",
      "entertainment: cartoon & animations": "📺",
    };

    // Check if there is a custom mapping for the category, use a default emoji if not
    return emojiMap[categoryLower] || "❓";
  };

  const handleStarClick = async (e) => {
    e.stopPropagation();

    try {
      const user = auth.currentUser;

      if (user) {
        const uid = user.uid;
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", uid);

        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const favoriteCategories = userData.favoriteCategories || [];

          const updatedFavorites = favoriteCategories.includes(category.id)
            ? favoriteCategories.filter((fav) => fav !== category.id)
            : [...favoriteCategories, category.id];

          await setDoc(
            userDocRef,
            { favoriteCategories: updatedFavorites },
            { merge: true },
          );
          console.log("Category favorited status updated successfully!");

          setUserFavorites(updatedFavorites);
          onCategoryToggle(category.id); // Moved the call to onCategoryToggle here
        } else {
          console.log("User document does not exist!");
        }
      } else {
        console.log("User not logged in.");
      }
    } catch (error) {
      console.error("Error updating category favorited status:", error);
    }
  };

  return (
    <div
      className="relative border p-4 m-4 rounded-md cursor-pointer text-center animate-slideup transitioninset-0 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200 shadow-2xl"
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={userFavorites.includes(category.id) ? solidStar : regularStar}
        style={{
          color: userFavorites.includes(category.id) ? "#ffd700" : "#ffffff",
          position: "absolute",
          top: "8px",
          left: "8px",
        }}
        onClick={handleStarClick}
      />
      <h2 className="text-4xl font-bold">
        {mapCategoryToEmoji(category.name)}
      </h2>
      <div className="pt-2 text-2xl">{category.name}</div>
    </div>
  );
}

export default TriviaCategoryCard;
