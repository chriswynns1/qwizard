import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const TriviaCard = ({ category }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

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

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    // You can add further logic here, like checking if the answer is correct
    // and providing feedback to the user.
  };

  // Add a check to ensure that the question prop is defined
  if (!questions.length) {
    return <div>Loading...</div>; // or you can render a loading message or some fallback content
  }

  return (
    <div className="border rounded-md p-4">
      <h3>{questions[0].question}</h3>
      <ul>
        {[...questions[0].incorrect_answers, questions[0].correct_answer].map(
          (answer, index) => (
            <li
              key={index}
              className={selectedAnswer === answer ? "selected" : ""}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default TriviaCard;
