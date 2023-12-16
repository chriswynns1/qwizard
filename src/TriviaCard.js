import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const TriviaCard = ({ category }) => {
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [quizSet, setQuizSet] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

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
          // Shuffle questions and their answer choices
          const shuffledQuestions = shuffleArray(data.questions);
          const questionsWithShuffledAnswers = shuffledQuestions.map(
            (question) => {
              const shuffledAnswers = shuffleArray([
                ...question.incorrect_answers,
                question.correct_answer,
              ]);
              return {
                ...question,
                answers: shuffledAnswers,
              };
            },
          );
          // Store only the first ten questions in the quiz set
          setQuizSet(questionsWithShuffledAnswers.slice(0, 10));
        }
      } catch (error) {
        console.error("Error grabbing questions:", error);
      }
    };
    fetchQuestions();
  }, [category]);

  const handleAnswerClick = async (selectedAnswer) => {
    const correctAnswer = quizSet[currentQuestionIndex].correct_answer;
    const userAnsweredCorrectly = selectedAnswer === correctAnswer;

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
      setIsCorrect(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 1500);
  };

  const handlePlayAgain = async () => {
    console.log("Play Again clicked");

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
        const shuffledQuestions = shuffleArray(data.questions);
        console.log("Shuffled questions:", shuffledQuestions);

        const questionsWithShuffledAnswers = shuffledQuestions.map(
          (question) => {
            const shuffledAnswers = shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]);
            return {
              ...question,
              answers: shuffledAnswers,
            };
          },
        );
        console.log(
          "Questions with shuffled answers:",
          questionsWithShuffledAnswers,
        );

        // Store only the first ten questions in the new quiz set
        setQuizSet(questionsWithShuffledAnswers.slice(0, 10));
        console.log("New quiz set:", quizSet);

        setCurrentQuestionIndex(0);
        setIsCorrect(null); // Add this line to reset the correctness state
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching questions for Play Again:", error);
    }
  };

  return (
    <div className="text-3xl border rounded-md p-4">
      {quizSet.length > 0 && currentQuestionIndex < quizSet.length && (
        <div>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: quizSet[currentQuestionIndex].question,
            }}
          />
          <div className="flex justify-center mt-4">
            {quizSet[currentQuestionIndex].answers.map((answer, index) => (
              <button
                key={index}
                className={`py-2 px-4 bg-blue-500 text-white rounded-md ${
                  isCorrect === false &&
                  answer === quizSet[currentQuestionIndex].correct_answer
                    ? "bg-red-500"
                    : ""
                }`}
                onClick={() => handleAnswerClick(answer)}
                disabled={isCorrect !== null}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            ))}
          </div>
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
      )}
      {currentQuestionIndex === quizSet.length && (
        <div className="text-center">
          <p>All questions answered! Good job, pal.</p>
          <p className="mt-4 text-lg font-bold">Final Score: {score}</p>
          <button
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
            onClick={handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default TriviaCard;
