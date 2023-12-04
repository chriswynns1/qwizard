// Play.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TriviaCard from './TriviaCard';

function Play({ selectedCategory }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        //const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory.id}&type=multiple`);
        //setQuestions(response.data.results);
        console.log("play card:" ,selectedCategory);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
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
