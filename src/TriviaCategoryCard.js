import React from 'react';

function TriviaCategoryCard({ category, onClick }) {
  return (
    <div className="border p-4 m-4 rounded-md" onClick={onClick}>
      <h2 className="text-xl font-bold">{category.name}</h2>
      {/* Add more details or styling as needed */}
    </div>
  );
}

export default TriviaCategoryCard;
