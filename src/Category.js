import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import axios from 'axios';
import TriviaCategoryCard from "./TriviaCategoryCard";
import TriviaCard from "./TriviaCard";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';


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

  const handleCategoryClick = async (category) => {
    try {
      // Fetch trivia questions from the API
      const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category.id}&type=multiple`);
      const triviaQuestions = response.data.results;

      // Store trivia questions in Firestore
      await storeQuestionsInFirestore(category.id, triviaQuestions);

      // Set the selected category and navigate to trivia card
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching or storing trivia questions:', error);
    }
  };

  const storeQuestionsInFirestore = async (categoryId, questions) => {
    try {
      const firestore = getFirestore();
  
      // Reference to the 'categories' collection
      const categoriesCollectionRef = collection(firestore, 'categories');
  
      // Reference to the document with categoryId in the 'categories' collection
      const categoryDocRef = doc(categoriesCollectionRef, categoryId.toString()); // Ensure categoryId is a string
      console.log('categoryDocRef: ', categoryDocRef);
  
      // Use setDoc to add or update the document in Firestore
      await setDoc(categoryDocRef, { questions });
    } catch (error) {
      console.error('Error setting trivia questions in Firestore:', error);
    }
  };
  

  const handleBackToCategories = () => {
    // Reset the selected category when going back
    setSelectedCategory(null);
  };

  return (
    <div className="text-gray-100 pt-20 pb-20">
      <div className="text-6xl text-center m-5">Qwizard Trivia</div>

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
