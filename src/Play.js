// Play.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import TriviaCard from "./TriviaCard";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebase";

const firestore = getFirestore(app);

function Play({ selectedCategory }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const docRef = doc(firestore, "categories", selectedCategory.id);
        console.log("docref: ", docRef);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched data:", data);
          setQuestions(data.questions || []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching trivia questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  return (
    <div className="text-gray-100">
      <h1>Trivia Play Page</h1>
      {questions.map((question, index) => (
        <TriviaCard key={index} question={question} />
      ))}
    </div>
  );
}

export default Play;
