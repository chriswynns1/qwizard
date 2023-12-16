import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const TriviaCard = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [user, setUser] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  console.log("category:", category);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("user: ", user.uid);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Run the effect once on component mount

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const firestore = getFirestore();
        const categoryDocRef = doc(
          firestore,
          "categories",
          category.id.toString(),
        );
        const docSnap = await getDoc(categoryDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setQuestions(data.questions || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
      }
    };

    fetchQuestions();
  }, [category]);

  // grab next question after the user answers one
  const fetchNextQuestion = () => {
    setQuestions((prevQuestions) => prevQuestions.slice(1));
  };

  const handleAnswerClick = async (answer) => {
    if (isCorrect !== null) {
      // If the user has already answered, do nothing
      return;
    }

    setSelectedAnswer(answer);

    // Check if the selected answer is correct
    const correctAnswer = questions[0].correct_answer;
    const userAnsweredCorrectly = answer === correctAnswer;

    setIsCorrect(userAnsweredCorrectly); // Set feedback state

    // Update Firestore database if the answer is correct
    if (userAnsweredCorrectly) {
      try {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid); // Replace with actual user ID

        // Fetch the current user data
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();

          // Update the user's points (add 10 points for a correct answer)
          const updatedPoints = (userData.points || 0) + 10;

          // Update the user document in Firestore
          await setDoc(userDocRef, { points: updatedPoints }, { merge: true });
        } else {
          console.log("User document does not exist!");
        }
      } catch (error) {
        console.error("Error updating user points:", error);
      }
    }

    // Move to the next question after a delay (you can adjust the delay as needed)
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      fetchNextQuestion();
      // Fetch and set the next question
      // You can use the same logic as in your current useEffect to fetch questions
    }, 1500);
  };

  // Add a check to ensure that the question prop is defined
  if (!questions.length) {
    return <div>Loading...</div>; // or you can render a loading message or some fallback content
  }

  return (
    <div className="p-4 border rounded-md shadow-lg">
      <h3 className="text-center">{questions[0].question}</h3>
      <div className="flex justify-center space-x-4">
        {[...questions[0].incorrect_answers, questions[0].correct_answer].map(
          (answer, index) => (
            <button
              key={index}
              className={`py-2 px-4 bg-blue-500 text-white rounded-md ${
                selectedAnswer === answer ? "bg-blue-700" : ""
              }`}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default TriviaCard;
