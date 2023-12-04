import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import axios from 'axios';
import TriviaCategoryCard from "./TriviaCategoryCard";
import TriviaCard from "./TriviaCard";

function Category() {
  const [user, setUser] = useState(null);
  const [triviaCategories, setTriviaCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
      .then((response) => {
        setTriviaCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.error('Error fetching trivia categories:', error);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleCategoryClick = (category) => {
    // Set the selected category in the state
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    // Reset the selected category when going back
    setSelectedCategory(null);
  };

  return (
    <div className="text-gray-100 pt-20 pb-20">
      <div className="text-6xl text-center m-5"></div>

      {selectedCategory ? (
        // Display trivia card when a category is selected
        <div>
          <TriviaCard category={selectedCategory} />
          <button onClick={handleBackToCategories}>Back to Categories</button>
        </div>
      ) : (
        // Display category cards when no category is selected
        <div>
          {triviaCategories.map((category) => (
            <TriviaCategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
