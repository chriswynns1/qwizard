// Import the 'Fragment' component from React
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const TriviaCard = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [user, setUser] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const fetchNextQuestion = () => {
    setQuestions((prevQuestions) => prevQuestions.slice(1));
  };

  const handleAnswerClick = async (answer) => {
    if (gameOver) {
      return;
    }

    if (isCorrect !== null) {
      return;
    }

    setSelectedAnswer(answer);
    const correctAnswer = questions[0].correct_answer;
    const userAnsweredCorrectly = answer === correctAnswer;

    setIsCorrect(userAnsweredCorrectly);

    if (userAnsweredCorrectly) {
      setScore((prevScore) => prevScore + 1);

      try {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);

        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const updatedPoints = (userData.points || 0) + 10;

          await setDoc(userDocRef, { points: updatedPoints }, { merge: true });
        } else {
          console.log("User document does not exist!");
        }
      } catch (error) {
        console.error("Error updating user points:", error);
      }
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
      fetchNextQuestion();

      if (questions.length === 1) {
        setGameOver(true);
        fetchQuestions(); // Fetch new questions after the game is over
      }
    }, 1500);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameOver(false);
    fetchQuestions();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (gameOver) {
    return (
      <div className="p-4 border rounded-md shadow-lg text-center">
        <h3>Quiz Over!</h3>
        <p>
          Your Score: {score}/{questions.length}
        </p>
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
      </div>
    );
  }

  // Use dangerouslySetInnerHTML to render HTML entities as HTML tags
  const questionText = { __html: questions[0].question };

  return (
    <div className="p-4 border rounded-md shadow-lg">
      <h3 className="text-center" dangerouslySetInnerHTML={questionText}></h3>
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
        {isCorrect !== null && (
          <p
            className={`text-center mt-4 text-${
              isCorrect ? "green" : "red"
            }-500 font-bold`}
          >
            {isCorrect ? "Correct!" : "Incorrect!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default TriviaCard;
