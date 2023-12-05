import React from 'react';

function TriviaCategoryCard({ category, onClick }) {
    // Function to map categories to emojis
    const mapCategoryToEmoji = (category) => {
      const categoryLower = category.toLowerCase();
      const emojiMap = {
        'general knowledge': '🌐',
        'entertainment: books': '📚',
        'entertainment: film': '🎬',
        'entertainment: music': '🎵',
        'entertainment: musicals & theatres': '🎭',
        'entertainment: television': '📺',
        'entertainment: video games': '🎮',
        'entertainment: board games': '🎲',
        'science & nature': '🔬',
        'science: computers': '💻',
        'science: mathematics': '🧮',
        'mythology': '🏛️',
        'sports': '⚽',
        'geography': '🌍',
        'history': '📜',
        'politics': '🏛️',
        'art': '🎨',
        'celebrities': '🌟',
        'animals': '🐾',
        'vehicles': '🚗',
        'entertainment: comics': '🦸',
        'science: gadgets': '🔧',
        'entertainment: japanese anime & manga': '🇯🇵',
        'entertainment: cartoon & animations': '📺',
      };

      // Check if there is a custom mapping for the category, use a default emoji if not
      return emojiMap[categoryLower] || '❓';
    };

  return (
    <div className="border p-4 m-4 rounded-md cursor-pointer text-center animate-slideup transitioninset-0 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200 shadow-2xl" onClick={onClick}>
      <h2 className="text-6xl font-bold">{mapCategoryToEmoji(category.name)}</h2>
      <div className='pt-2 text-2xl'>{category.name}</div>
    </div>
  );
}

export default TriviaCategoryCard;
