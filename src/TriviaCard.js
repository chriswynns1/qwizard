// TriviaCard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function TriviaCard({ category }) {
    const [questions, setQuestions] = useState([]);
    const [selectedChoice, setSelectedChoice] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`https://opentdb.com/api.php?amount=50&category=${category.id}`);
                setQuestions(response.data.results);
                console.log("questions", response.data.results);
            } catch (error) {
                console.error('Error fetching trivia questions:', error);
            }
        };

        fetchQuestions();
    }, [category]);

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const choices = questions.length > 0 ? shuffleArray([...questions[0].incorrect_answers, questions[0].correct_answer]) : [];
    const questionText = questions.length > 0 ? questions[0].question : 'Loading...';

    const handleChoiceClick = (choice) => {
        // Handle the selected choice (you can implement the logic you need)
        setSelectedChoice(choice);
    };

    return (
        <div className='mx-60'>
            <div className="rounded-md border p-4 text-white">
                <div className="text-center text-4xl">{questionText}</div>
                <div className="flex justify-center">
                    {choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => handleChoiceClick(choice)}
                            className={`choice-button mx-2 ${selectedChoice === choice ? 'selected' : ''}`}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TriviaCard;
