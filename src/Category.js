import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Added useParams
import { auth } from "./firebase";
import axios from "axios";
import TriviaCategoryCard from "./TriviaCategoryCard";
import TriviaCard from "./TriviaCard";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";

function Category() {
  // Example of State Management
  const [user, setUser] = useState(null);
  const [triviaCategories, setTriviaCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => {
        setTriviaCategories(response.data.trivia_categories);
      })
      .catch((error) => {
        console.error("Error fetching trivia categories:", error);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Use the extracted ID to fetch questions for the specific category
    const fetchCategoryQuestions = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`,
          );
          const triviaQuestions = response.data.results;

          // Store trivia questions in Firestore
          await storeQuestionsInFirestore(id, triviaQuestions);

          // Set the selected category
          setSelectedCategory({
            id: Number(id),
            name: "Placeholder Category Name",
          });
        } catch (error) {
          console.error("Error fetching or storing trivia questions:", error);
        }
      }
    };

    fetchCategoryQuestions();
  }, [id]);

  const handleCategoryClick = async (category) => {
    try {
      // Fetch trivia questions from the API
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${category.id}&type=multiple`,
      );
      const triviaQuestions = response.data.results;

      // Store trivia questions in Firestore
      await storeQuestionsInFirestore(category.id, triviaQuestions);

      // Set the selected category and navigate to trivia card
      setSelectedCategory(category);
      console.log("selected category: ", selectedCategory);
    } catch (error) {
      console.error("Error fetching or storing trivia questions:", error);
    }
  };

  const storeQuestionsInFirestore = async (categoryId, questions) => {
    try {
      const firestore = getFirestore();

      // ref to the 'categories' collection
      const categoriesCollectionRef = collection(firestore, "categories");

      // ref to document with categoryId in the 'categories' collection
      const categoryDocRef = doc(
        categoriesCollectionRef,
        categoryId.toString(),
      ); // Ensure categoryId is a string

      // Fetch the existing questions from Firestore
      const docSnap = await getDoc(categoryDocRef);
      const existingQuestions = docSnap.exists()
        ? docSnap.data().questions || []
        : [];

      // Check if the question already exists in Firestore, if not, add it
      questions.forEach((newQuestion) => {
        const questionExists = existingQuestions.some(
          (existingQuestion) =>
            existingQuestion.question === newQuestion.question,
        );

        if (!questionExists) {
          existingQuestions.push(newQuestion);
        }
      });

      // Use setDoc to update the document in Firestore with the merged questions
      await setDoc(categoryDocRef, { questions: existingQuestions });
    } catch (error) {
      console.error("Error setting trivia questions in Firestore:", error);
    }
  };

  const handleBackToCategories = () => {
    // Reset the selected category when going back
    setSelectedCategory(null);
  };

  return (
    <div className="text-gray-100 pt-20 md:pt-20 pb-10 md:pb-20">
      <div className="text-3xl md:text-6xl text-center m-3 md:m-5">
        Qwizard Trivia
      </div>

      {selectedCategory ? (
        // Display trivia card when a category is selected
        <div className="mx-20">
          <TriviaCard category={selectedCategory} />
          <button onClick={handleBackToCategories}>Back to Categories</button>
        </div>
      ) : (
        // Display category cards when no category is selected
        <div className="text-xl grid grid-cols-1 md:grid-cols-4 gap-4 md:mx-10 lg:mx-20">
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
